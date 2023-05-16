import React, {useEffect, useReducer, useState,useContext} from 'react';
import AuthContext from '../UI/store/auth-context';
import Input from '../UI/Input/Input.js';
import classes from './Login.module.css';
import { useRef } from 'react';

const emailReducer = (state, action) =>{
    if (action.type === 'USER_INPUT'){
        return {value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === 'INPUT_BLUR'){
        return{value: state.value, isValid: state.value.includes('@')};
    }
    return { value: '', isValid: false};
};

const passwordReducer = (state, action) =>{
    if (action.type === 'USER_INPUT'){
        return {value: action.val, isValid: action.val.trim().length>6};
    } 
    if (action.type === 'INPUT_BLUR'){
        return{value: state.value, isValid: state.value.trim().length>6};
    }
    return { value: '', isValid: false};
};



const Login = (props)=>{

const [formIsValid, setFormIsValid]=useState(false);

const [emailState, dispatchEmail]= useReducer(emailReducer, {
    value: '',
    isValid: null,
});

const [passwordState, dispatchPassword]= useReducer(passwordReducer, {
    value: '',
    isValid: null,
});
const authCtx = useContext(AuthContext);

const emailInputRef =useRef();
const passwordInputRef = useRef();

const {isValid: emailIsValid} = emailState;
const{isValid: passwordIsValid} = passwordState;

useEffect(()=>{
   const identifier = setTimeout(() => {
        console.log('checking the validity');
    setFormIsValid
    (emailIsValid && passwordIsValid);
    }, 500);


    return()=>{
        console.log('Effect Cleanup');
        clearTimeout(identifier);
    };
        },[emailIsValid,passwordIsValid]);



const emailChangeHandler= (event)=>{
    dispatchEmail({type:'USER_INPUT', val:event.target.value});

    setFormIsValid(
        event.target.value.includes('@') && passwordState.isValid
    );
};


const passwordChangeHandler = (event)=>{
    dispatchPassword({type:'USER_INPUT', val:event.target.value});

    setFormIsValid(
        emailState.isValid && event.target.value.trim().length>6
    );
};
const validateEmailHandler=()=>{
    dispatchEmail({type: 'INPUT_BLUR'});
};
const validatePasswordHadler = ()=>{
    dispatchPassword({type: 'INPUT_BLUR'});
};
const submitHandler = (event)=>{
    event.preventDefault();
    if(formIsValid){
        authCtx.onLogin(emailState.value,passwordState.value);
    }
        else if(!emailIsValid){
            emailInputRef.current.focus();
        }
        else {
            passwordInputRef.current.focus();
        }
    };
    
return(
    <div className= {classes.login}>
        <form onSubmit={submitHandler}>
          <Input 
          ref={emailInputRef}
          id="email" 
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}/>

          <Input 
          ref={passwordInputRef}
          id="password" 
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHadler}/>


            <div className={classes.actions}>
            <button type="submit" className={classes.btn} disabled={!formIsValid}>login</button>
            </div>

        </form>
    </div>
);

}
export default Login;