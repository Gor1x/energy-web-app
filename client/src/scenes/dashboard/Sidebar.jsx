import { useState } from "react";
import { Box, IconButton, Typography, useTheme, Button, Modal, MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MapIcon from '@mui/icons-material/Map';
import { tokens } from "../../theme";
import Map from "../../components/Map";
import useUserFiles from "./hooks/useUserFiles";

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
      <IconButton onClick={() => handleOpenFileLoading(type)}>
        <UploadFileIcon
          sx={{
            color: colors.grey[500],
            marginRight: 4
          }}
        />
      </IconButton>
    </Box>

  const [modal, setModal] = useState(null)

  const handleOpenFileLoading = (type) => setModal(LoadFileModal(type))
  const handleOpenMap = (type) => setModal(MapModal(type))
  const handleClose = () => setModal(null);

  const handleUpload = (event, type) => {
    let file = event.target.files[0];
    uploadFile(file, type)
    handleClose(false)
  }

  const LoadFileModal = (type) =>
    <Modal
      open
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Загрузить {type == "algorithm" ? "алгоритм" : "датасет"}
        </Typography>
        <input type="file"
          name="myFile"
          onChange={(event) => handleUpload(event, type)} />
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
      </Box>
    </Modal>

  const MapModal = () =>
    <Modal
      open
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 500,
        width: 700,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Map height="100%"/>
      </Box>
    </Modal>



  return (
    <Box {...other}>
      {modal}
      <MenuList
        style={{
          "height": "100%",
          "background": colors.primary[500]
        }}>
        <ListTitle type="algorithm" />
        {userFiles['algorithms'].map((item, i) => <Item key={`sidebar-algorithm-${i}`} title={item.name} file={item} />)}
        <ListTitle type="dataset" />
        {userFiles['datasets'].map((item, i) => <Item key={`sidebar-dataset-${i}`} title={item.name} file={item} />)}
        <MenuItem onClick={handleOpenMap}>
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
