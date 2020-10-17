import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



export default function ToDoList(props) {
    const { toDo, estado } = props;

    const deleteItem = () =>{
        props.onDelete(toDo)
    }

    return (
        <ListItem key={toDo}>
            <ListItemText primary={` ${toDo} ${estado}`} />
            <IconButton  aria-label="Edit">
                <EditIcon />
            </IconButton>
            <IconButton  onClick={deleteItem} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );

}
