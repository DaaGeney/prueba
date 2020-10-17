import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import CardHeader from '@material-ui/core/CardHeader';
import Alert from '@material-ui/lab/Alert';
import ToDoList from './ToDoList'


const useStyles = makeStyles({
  root: {
    minWidth: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  }
});

function IndexCard() {
  const classes = useStyles();
  const [task, setTask] = useState("");

  const [toDoList, settoDoList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const validateCreation = new RegExp("^.{6,40}$");

  let handleChange = (e) => {
    setTask(e.target.value)
  }

  const snackBar = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onDelete = (id) => {
    let temp = toDoList.map(e => e.toDo === id ? { ...e, estado: "Eliminado" } : e)
    settoDoList([...temp]);
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (validateCreation.test(task)) {
      settoDoList([...toDoList, { toDo: task, estado: "Incompleto" }]);
      setTask('')
    } else {
      snackBar();
    }
  }

  return (
    <form className={classes.root} onSubmit={handleClick} autoComplete="off">
      <Card >
        <CardHeader
          title="To Do "
          subheader="Add To Do "
        />
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="error">Número de caracteres invalido!</Alert>

        </Snackbar>
        <CardContent>
          <div>
            <br />
            <TextField id="Description" label="Description" onChange={handleChange} value={task} inputProps={{ maxLength: 40 }} variant="filled" />
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button variant="contained" type="submit" color="primary">
            Add
        </Button>
        </CardActions>
        {
          toDoList.map(e => <ToDoList toDo={e.toDo} estado={e.estado} onDelete={onDelete}/>)
        }
      </Card>
    </form>

  );
}
export default IndexCard;