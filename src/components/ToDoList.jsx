import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';



export default function ToDoList(props) {
    const { toDo, estado } = props;

    const deleteItem = () =>{
        props.onDelete(toDo)
    }
    const editItem = () =>{
        props.onEdit(toDo)
    }
    const completeItem = () =>{
        props.onComplete(toDo)
    }

    return (
        <ListItem key={toDo}>
            <ListItemText primary={` ${toDo} ${estado}`} />
            <IconButton  onClick={completeItem} aria-label="delete">
                <DoneIcon />
            </IconButton>
            <IconButton onClick={editItem} aria-label="Edit">
                <EditIcon />
            </IconButton>
            <IconButton  onClick={deleteItem} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );

}
