import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    marginTop: '30px',
    float: 'right'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    display: 'block'
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

export default function TextFields() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
      name: ''
    });
  
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };

    return (
        <div className='pt-5 d-flex justify-content-center align-middle'>
            <form className='bg-white p-5 rounded' noValidate autoComplete="off">
                <h5 className='pl-2'>Login</h5>
                <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="normal"
                />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                />
                <Button variant="contained" color="primary" className={classes.button}>
                    Submit
                </Button>
            </form>
        </div>
    )
}