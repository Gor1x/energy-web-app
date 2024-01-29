import {useEffect} from "react";
import {Box, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Typography, useTheme} from "@mui/material";
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import MapIcon from '@mui/icons-material/Map';
import {themeSettings} from "../../theme";
import MapModal from "./modals/MapModal";
import LoadFileModal from "./modals/LoadFileModal";
//import { openModal, closeModal } from '../../modal';
import {getNameWithExtension} from "../../utils/getFileLabel";
import {useStoreon} from 'storeon/react';
import React from "react";
import {FileObject} from "../../types/FileObject";

const Sidebar = (props: { [x: string]: any; onSelect: {(file: FileObject) : void}; closeTabByFile: {(file: FileObject) : void}}) => {
    const theme = useTheme();
    const colors = themeSettings(theme.palette.mode).palette;
    const {dispatch, algorithms, datasets} = useStoreon('algorithms', 'datasets')

    useEffect(() => {
        dispatch('algorithms/load')
        dispatch('datasets/load')
    }, [])

    const mapTypeToActions: Record<string, { add: string, delete: string }> = {
        "algorithm": {
            add: 'algorithms/add',
            delete: 'algorithms/delete'
        },
        "dataset": {
            add: 'datasets/add',
            delete: 'datasets/delete'
        }
    };

    const {onSelect, closeTabByFile, ...other} = props;

    const Item = ({title, file}: {title: string, file: FileObject}) => {
        return (
            <MenuItem
                onClick={() => onSelect(file)}>
                <ListItemIcon sx={{color: colors.text.menuDefault}}>
                    <FileOpenOutlinedIcon/>
                </ListItemIcon>
                <ListItemText sx={{color: colors.text.menuDefault}}>{title}</ListItemText>
                {file.user_id !== -1 ?
                    <IconButton size="small" sx={{color: colors.text.menuDefault}}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeTabByFile(file);
                                    dispatch(mapTypeToActions[file.type].delete, file);
                                }}>
                        <DeleteOutlineIcon/>
                    </IconButton> : <div style={{height: '30px', width: '30px'}}/>
                }
            </MenuItem>
        );
    };

    const ListTitle = ({type}: {type: string}) =>
        <Box display="flex"
             alignItems="center"
             justifyContent="space-between"
             height="40px"
             bgcolor={colors.background.sidebarHeader}
        >
            <Typography
                variant="h6"
                color={colors.text.default}
                ml={2}>
                {type === "algorithm" ? "Алгоритмы" : "Датасеты"}
            </Typography>
            <IconButton
                size="small"
                sx={{mr: "15px"}}
                onClick={() => dispatch('modal/open',
                    <LoadFileModal
                        type={type}
                        handleUpload={handleUpload}
                        handleClose={() => {
                            dispatch('modal/close')
                        }}/>)}>
                <UploadFileOutlinedIcon
                    sx={{
                        color: colors.text.menuDefault
                    }}
                />
            </IconButton>
        </Box>

    const handleUpload = (event: any, type:string) => {
        let file = event.target.files[0]
        dispatch(mapTypeToActions[type].add, file)
        dispatch('modal/close')
    }

    return (
        <Box {...other}>
            <MenuList
                style={{
                    "height": "100%",
                    margin: "0px",
                    padding: "0px",
                    "background": colors.background.sidebar
                }}>
                <ListTitle type="algorithm"/>
                {algorithms.map((item: FileObject, i: string) => <Item key={`sidebar-algorithm-${i}`} title={getNameWithExtension(item)}
                                                   file={item}/>)}
                <ListTitle type="dataset"/>
                {datasets.map((item: FileObject, i: string) => <Item key={`sidebar-dataset-${i}`} title={getNameWithExtension(item)}
                                                 file={item}/>)}
                <MenuItem onClick={() =>
                    dispatch('modal/open',
                        <MapModal onClick={() => {
                            onSelect(datasets[0])
                            dispatch('modal/close')
                        }}/>)
                }>
                    <ListItemIcon sx={{color: colors.text.menuDefault}}>
                        <MapIcon/>
                    </ListItemIcon>
                    <ListItemText sx={{color: colors.text.menuDefault}}>Выбрать на карте</ListItemText>
                    <div style={{height: '30px', width: '30px'}}/>
                </MenuItem>
            </MenuList>
        </Box>
    );
};

export default Sidebar;
