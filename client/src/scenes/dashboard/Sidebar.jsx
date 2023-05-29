import { useEffect } from "react";
import { Box, IconButton, Typography, useTheme, MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import MapIcon from '@mui/icons-material/Map';
import { tokens } from "../../theme";
import MapModal from "./modals/MapModal";
import LoadFileModal from "./modals/LoadFileModal";
import { openModal, closeModal } from '../../modal';
import { getNameWithExtension } from "../../utils/getFileLabel";
import { useStoreon } from 'storeon/react';

const Sidebar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { dispatch, algorithms, datasets } = useStoreon('algorithms', 'datasets')

  useEffect(() => {
    dispatch('algorithms/load')
    dispatch('datasets/load')
  }, [])

  const mapTypeToActions = {
    algorithm: {
      add: 'algorithms/add',
      delete: 'algorithms/delete'
    },
    dataset: {
      add: 'datasets/add',
      delete: 'datasets/delete'
    }
  };

  const { onSelect, closeTabByFile, ...other } = props;

  const Item = ({ title, file }) => {
    return (
      <MenuItem
        onClick={() => onSelect(file)}>
        <ListItemIcon sx={{ color: colors.grey[900] }}>
          <FileOpenOutlinedIcon />
        </ListItemIcon>
        <ListItemText sx={{ color: colors.grey[900] }}>{title}</ListItemText>
        {file.user_id != -1 ?
          <IconButton size="small" sx={{ color: colors.grey[900] }}
            onClick={(e) => {
              e.stopPropagation();
              closeTabByFile(file);
              dispatch(mapTypeToActions[file.type].delete, file);
            }}>
            <DeleteOutlineIcon />
          </IconButton> : <div style={{height: '30px', width: '30px'}}/>
        }
      </MenuItem>
    );
  };

  const ListTitle = ({ type }) =>
    <Box display="flex"
      alignItems="center"
      justifyContent="space-between">
      <Typography
        variant="h6"
        color={colors.grey[800]}
        ml={2}>
        {type == "algorithm" ? "Алгоритмы" : "Датасеты"}
      </Typography>
      <IconButton
        size="small"
        sx={{ mr: "15px" }}
        onClick={() => openModal(
          <LoadFileModal
            type={type}
            handleUpload={handleUpload}
            handleClose={closeModal} />)}>
        <UploadFileOutlinedIcon
          sx={{
            color: colors.grey[800]
          }}
        />
      </IconButton>
    </Box>

  const handleUpload = (event, type) => {
    let file = event.target.files[0];
    dispatch(mapTypeToActions[type].add, file);
    closeModal();
  }

  return (
    <Box {...other}>
      <MenuList
        style={{
          "height": "100%",
          "background": colors.primary[600]
        }}>
        <ListTitle type="algorithm" />
        {algorithms.map((item, i) => <Item key={`sidebar-algorithm-${i}`} title={getNameWithExtension(item)} file={item} />)}
        <ListTitle type="dataset" />
        {datasets.map((item, i) => <Item key={`sidebar-dataset-${i}`} title={getNameWithExtension(item)} file={item} />)}
        <MenuItem onClick={() => 
            openModal(<MapModal onClick={(i) => {
              onSelect(datasets[0])
              closeModal()
            }}/>)
          }>
          <ListItemIcon sx={{ color: colors.grey[900] }}>
            <MapIcon />
          </ListItemIcon>
          <ListItemText sx={{ color: colors.grey[900] }}>Выбрать на карте</ListItemText>
          <div style={{height: '30px', width: '30px'}}/>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default Sidebar;
