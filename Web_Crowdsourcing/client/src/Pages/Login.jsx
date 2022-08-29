import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SignUp from './SignUp';
import { Button, Input,Form,FormGroup,ControlLabel,FormControl, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            formValues:{
                email:"",
                password:""
            }
        };
    }
    //---------------------------------------------------------------------------------
    handleChange=(name,value)=> {
        let formValues = this.state.formValues;   
        formValues[name] = value;
        this.setState({formValues})
    }
    //---------------------------------------------------------------------------------
    handleSubmit = (event) => {
            event.preventDefault();
            alert("Name: " + this.state.formValues.email + " Email: " + this.state.formValues.password); /*todo use them for validation with the server*/
            /**
             * Make fetch post request to the server
             */
         
    };
    //---------------------------------------------------------------------------------
    render(){
        return (
            <Container component="main" maxWidth="xs">
            <div >
                <Typography component="h1" variant="h5">
                Login
                </Typography>
                <Form  noValidate>
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl onChange={(value)=> this.handleChange('email',value)} name="email" style={{ width: 400 }} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl onChange={(value)=> this.handleChange('password',value)} name="password" style={{ width: 400 }} />
                </FormGroup>
               <Button block size='md' style={{ width: 400,marginTop:'2%' }} appearance="primary" color="cyan"  onClick={(e)=>this.handleSubmit(e)}>
                    Sign In
                </Button>
                </Form>
            </div>
            </Container>
            );
    }
}


export default SignIn;