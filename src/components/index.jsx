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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    justifyContent: 'center'
  }
});

function IndexCard() {
  const classes = useStyles();
  const [task, setTask] = useState("");
  const [countingDeleted, setCountingDeleted] = useState(0);
  const [countingIncompleted, setCountingIncompleted] = useState(0);
  const [countingDone, setCountingDone] = useState(0);
  const [oldTask, setOld] = useState("");
  const [textSnack, setTextSnack] = useState("");
  const [toDoList, settoDoList] = useState([]);
  const [auxToDoList, setAuxTodoList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const validateCreation = new RegExp("^.{6,40}$");
  const [edit, setEdit] = useState(false);
  const [value, setValue] = React.useState('Blank');
  let handleChange = (e) => {
    setTask(e.target.value)
  }

  const snackBar = (msg) => {
    setTextSnack(msg)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onDelete = (id) => {
    const result = toDoList.filter(e => e.toDo === id);
    if (result[0].estado === 'Incompleto') {
      let temp = toDoList.map(e => e.toDo === id ? { ...e, estado: "Eliminado" } : e)
      settoDoList([...temp]);
      setCountingIncompleted(countingIncompleted - 1)
      setCountingDeleted(countingDeleted + 1)
    } else {
      snackBar("Esta tarea ya fue completada o eliminada");
    }
  }

  const onComplete = (id) => {
    const result = toDoList.filter(e => e.toDo === id);
    if (result[0].estado === 'Incompleto') {
      let temp = toDoList.map(e => e.toDo === id ? { ...e, estado: "Completado" } : e)
      settoDoList([...temp]);
      setCountingIncompleted(countingIncompleted - 1)
      setCountingDone(countingDone + 1)
    } else {
      snackBar("Esta tarea ya fue completada o eliminada");
    }
  }

  const onEdit = (id) => {
    const result = toDoList.filter(e => e.toDo === id);
    if (result[0].estado === 'Incompleto') {
      setTask(id)
      setOld(id)
      setEdit(true)
    } else {
      snackBar("Esta tarea ya fue completada o eliminada");
    }
  }

  const ToDoListAux = (props) => {
    const { toDo } = props;
    return (
      <ListItem key={toDo}>
        <ListItemText primary={` ${toDo} `} />
      </ListItem>
    );
  }


  const handleRadio = (event) => {
    setValue(event.target.value);
    setAuxTodoList([...toDoList.filter(e => e.estado === event.target.value)])
  };

  const handleClick = (e) => {
    e.preventDefault()
    if (validateCreation.test(task)) {
      if (!edit) {
        if(auxToDoList){
          setAuxTodoList([...auxToDoList, { toDo: task, estado: "Incompleto" }]);
          setValue('Todo')
          settoDoList([...auxToDoList])
        }else{
          settoDoList([...toDoList, { toDo: task, estado: "Incompleto" }]);
        }
        setTask('')
        setCountingIncompleted(countingIncompleted + 1)
      } else {
        let temp = toDoList.map(e => e.toDo === oldTask ? { ...e, toDo: task } : e)
        settoDoList([...temp]);
        setEdit(false)
        setTask('')
        setValue('Blank')
      }
    } else {
      snackBar("Número de caracteres invalido!");
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
          <Alert severity="error">{textSnack}</Alert>
        </Snackbar>
        <CardContent>
          <div>
            <br />
            <TextField id="Description" label="Description" onChange={handleChange} value={task} inputProps={{ maxLength: 40 }} variant="filled" />
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button variant="contained" type="submit" color="primary">
            {edit ? "Editar" : "Crear"}
          </Button>
        </CardActions>
        {
          toDoList.map(e => <ToDoList key={e.toDo} toDo={e.toDo} onDelete={onDelete} onEdit={onEdit} onComplete={onComplete} />)
        }
        <div className={classes.root}>{`Completos: ${countingDone}, Incompletos: ${countingIncompleted}, Eliminados: ${countingDeleted}`}</div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Filtro</FormLabel>
          <RadioGroup row aria-label="Filtro" name="gender1" color="blue" value={value} onChange={handleRadio}>
            <FormControlLabel value="Completado" control={<Radio />} label="Completado" />
            <FormControlLabel value="Eliminado" control={<Radio />} label="Eliminado" />
            <FormControlLabel value="Incompleto" control={<Radio />} label="Incompleto" />
            <FormControlLabel value="Blank" control={<Radio />} label="Blank" />

          </RadioGroup>
        </FormControl>
        {
          auxToDoList.map(e => <ToDoListAux key={e.toDo} toDo={e.toDo} />)
        }
      </Card>
    </form>
  );
}
export default IndexCard;