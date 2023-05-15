import { useState, useEffect } from "react";
import { Box, IconButton, Typography, useTheme, Button, Modal, MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { authFetch } from '../../auth';
import { tokens } from "../../theme";

const Sidebar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [items, setItems] = useState({ algorithms: [], datasets: [] })
  const { onSelect } = props;

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
          let it = Object.assign({}, items)
          const requestOptions = {
            method: 'DELETE'
          };
          switch (file.type) {
            case 'algorithm':
              authFetch(`/algorithms/${file.id}`, requestOptions)
                .then(response => {
                  if (response.status == 200) {
                    it['algorithms'].splice(it['algorithms'].indexOf(file), 1)
                    setItems(it)
                  }
                })
            case 'dataset':
              authFetch(`/datasets/${file.id}`, requestOptions)
                .then(response => {
                  if (response.status == 200) {
                    it['datasets'].splice(it['datasets'].indexOf(file), 1)
                    setItems(it)
                  }
                })
          }
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
      <IconButton onClick={() => handleOpen(type)}>
        <UploadFileIcon
          sx={{
            color: colors.grey[500],
            marginRight: 4
          }}
        />
      </IconButton>
    </Box>

  const [modal, setModal] = useState(null)

  const handleOpen = (type) => setModal(LoadFileModal(type))
  const handleClose = () => setModal(null);

  const handleUpload = (event, type) => {
    let file = event.target.files[0];
    if (file) {
      let data = new FormData();
      data.append('file', file);
      const requestOptions = {
        method: 'POST',
        body: data
      };
      let it = Object.assign({}, items)
      switch (type) {
        case 'algorithm':
          authFetch("/algorithms", requestOptions)
            .then(response => response.json())
            .then(newItem => {
              it['algorithms'] = [...it['algorithms'], newItem[0]]
              setItems(it)
            });
        case 'dataset':
          authFetch("/datasets", requestOptions)
            .then(response => response.json())
            .then(newItem => {
              it['datasets'] = [...it['datasets'], newItem[0]]
              setItems(it)
            });
      }
    }
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

  useEffect(() => {
    Promise.all([
      authFetch(`/algorithms/`)
        .then(response => response.json()),
      authFetch(`/datasets/`)
        .then(response => response.json()),
    ]).then((values) =>
      setItems({
        algorithms: values[0].map(entry => ({ ...entry, type: "algorithm" })),
        datasets: values[1].map(entry => ({ ...entry, type: "dataset" }))
      })
    )
  }, []);

  return (
    <>
      {modal}
      <MenuList
        style={{
          "background": colors.primary[500]
        }}>
        <ListTitle type="algorithm" />
        {items['algorithms'].map(item => <Item title={item.name} file={item} />)}
        <ListTitle type="dataset" />
        {items['datasets'].map(item => <Item title={item.name} file={item} />)}
      </MenuList>
    </>
  );
};

export default Sidebar;
