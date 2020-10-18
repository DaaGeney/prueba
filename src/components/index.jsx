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
  const [oldTask, setOld] = useState("");
  const [textSnack, setTextSnack] = useState("");
  const [toDoList, settoDoList] = useState([]);
  const [auxToDoList, setAuxTodoList] = useState();
  const [open, setOpen] = React.useState(false);
  const validateCreation = new RegExp("^.{6,40}$");
  const [edit, setEdit] = useState(false);
  const [value, setValue] = React.useState('Todo');
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
    } else {
      snackBar("Esta tarea ya fue completada o eliminada");
    }
  }

  const onComplete = (id) => {
    let temp = toDoList.map(e => e.toDo === id ? { ...e, estado: "Completado" } : e)
    settoDoList([...temp]);
  }

  const onEdit = (id) => {
    setTask(id)
    setOld(id)
    setEdit(true)
  }


  const handleRadio = (event) => {
    setValue(event.target.value);
    if (event.target.value !== "Todo") {
      if (auxToDoList) {
        settoDoList(auxToDoList.filter(e => e.estado === event.target.value))
      } else {
        setAuxTodoList([...toDoList])
        settoDoList(toDoList.filter(e => e.estado === event.target.value))
      }

    } else {
      settoDoList([...auxToDoList])
    }
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
        
      } else {
        
        let temp = toDoList.map(e => e.toDo === oldTask ? { ...e, toDo: task } : e)
        settoDoList([...temp]);
        setEdit(false)
        setTask('')
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
        <FormControl component="fieldset">
          <FormLabel component="legend">Filtro</FormLabel>
          <RadioGroup row aria-label="Filtro" name="gender1" color="blue" value={value} onChange={handleRadio}>
            <FormControlLabel value="Completado" control={<Radio />} label="Completado" />
            <FormControlLabel value="Eliminado" control={<Radio />} label="Eliminado" />
            <FormControlLabel value="Incompleto" control={<Radio />} label="Incompleto" />
            <FormControlLabel value="Todo" control={<Radio />} label="Todo" />
          </RadioGroup>
        </FormControl>
        {
          toDoList.map(e => <ToDoList key={e.toDo} toDo={e.toDo} estado={e.estado} onDelete={onDelete} onEdit={onEdit} onComplete={onComplete} />)
        }
      </Card>
    </form>

  );
}
export default IndexCard;