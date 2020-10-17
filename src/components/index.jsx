import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import BD from './BD'
const useStyles = makeStyles({
  root: {
    minWidth: 500,
  },
  limit: {

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

function IndexCard(props) {
  const classes = useStyles();
  const [task, setTask] = useState("");
  

  let handleChange =(e) =>{
    setTask(e.target.value)
  }

  let handleClick = (e) =>{
    e.preventDefault()
    //BD.push({ToDo: "task", estate: "Imcompleto"})
    console.log("BD");
  }

  return (
    <form className={classes.root} onSubmit={handleClick} autoComplete="off">
      <Card >
        <CardHeader
          title="To Do "
          subheader="Add To Do "
        />
        <CardContent>
          <div>
            <br />
            <TextField id="Description" label="Description" onChange={handleChange} value={task} inputProps={{ maxLength: 40 }}  variant="filled" />
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button variant="contained" type="submit"  color="primary">
            Add
        </Button>
        </CardActions>

      </Card>
    </form>

  );
}
export default IndexCard;