import { useState } from "react";
import { Box, IconButton, Typography, useTheme, Button, Modal, MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MapIcon from '@mui/icons-material/Map';
import { tokens } from "../../theme";
import MapModal from "./modals/MapModal";
import LoadFileModal from "./modals/LoadFileModal";
import useUserFiles from "../../hooks/useUserFiles";
import { openModal, closeModal } from '../../modal';

const Sidebar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userFiles, uploadFile, deleteFile } = useUserFiles();
  const { onSelect, ...other } = props;

  const Item = ({ title, file }) => {
    return (
      <MenuItem
        onClick={() => onSelect(file)}>
        <ListItemIcon sx={{ color: colors.grey[900] }}>
          <FileOpenIcon />
        </ListItemIcon>
        <ListItemText sx={{ color: colors.grey[900] }}>{title}</ListItemText>
        <IconButton onClick={(e) => {
          e.stopPropagation()
          deleteFile(file)
        }}>
          <ListItemIcon
            sx={{ color: colors.grey[500] }}>
            <DeleteIcon />
          </ListItemIcon>
        </IconButton>
      </MenuItem>
    );
  };

  const ListTitle = ({ type }) =>
    <Box display="flex"
      alignItems="center"
      justifyContent="space-between">
      <Typography
        variant="h6"
        color={colors.grey[600]}
        ml={2}>
        {type == "algorithm" ? "Алгоритмы" : "Датасеты"}
      </Typography>
      <IconButton onClick={() => openModal(
          <LoadFileModal 
            type={type} 
            handleUpload={handleUpload} 
            handleClose={closeModal}/>)}>
        <UploadFileIcon
          sx={{
            color: colors.grey[500],
            marginRight: 4
          }}
        />
      </IconButton>
    </Box>

  const handleUpload = (event, type) => {
    let file = event.target.files[0];
    uploadFile(file, type)
    closeModal()
  }

  return (
    <Box {...other}>
      <MenuList
        style={{
          "height": "100%",
          "background": colors.primary[500]
        }}>
        <ListTitle type="algorithm" />
        {userFiles['algorithms'].map((item, i) => <Item key={`sidebar-algorithm-${i}`} title={item.name} file={item} />)}
        <ListTitle type="dataset" />
        {userFiles['datasets'].map((item, i) => <Item key={`sidebar-dataset-${i}`} title={item.name} file={item} />)}
        <MenuItem onClick={() => openModal(<MapModal/>)}>
          <ListItemIcon sx={{ color: colors.grey[900] }}>
            <MapIcon />
          </ListItemIcon>
          <ListItemText sx={{ color: colors.grey[900] }}>Данные с полигона</ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default Sidebar;
