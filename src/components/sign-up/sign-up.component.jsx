import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth,createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';
class SignUp extends React.Component{
    constructor(){
        super();
        //not deprecated

        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleSubmit = async event => {
      //async function that gets the event
        event.preventDefault();
        const {displayName,email, password,confirmPassword} = this.state;

        if(password!==confirmPassword){
            alert('passwords dont match')
            return;
        }
        else if(password.length<6){
          alert("Passwords must be at least 6 characters long")
          return;
        }
        try{
            const {user}=await auth.createUserWithEmailAndPassword(
              //method that comes with auth library
              // Creates a new user account with the specified email address and password.
              // User will also be signed in to your application.
                email,
                password
            );
            
            await createUserProfileDocument(user, {displayName});
        
            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''
            })

        }catch(error){
            console.error(error);
        }
    };

    handleChange=  event => {
        const {name,value}=event.target;

        this.setState({[name]:value});
    }


    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        //destructuring from state
        return (
          <div className='sign-up'>
            <h2 className='title'>I do not have a account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
              <FormInput
                type='text'
                name='displayName'
                value={displayName}
                onChange={this.handleChange}
                label='Display Name'
                required
              />
              <FormInput
                type='email'
                name='email'
                value={email}
                onChange={this.handleChange}
                label='Email'
                required
              />
              <FormInput
                type='password'
                name='password'
                value={password}
                onChange={this.handleChange}
                label='Password'
                required
              />
              <FormInput
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={this.handleChange}
                label='Confirm Password'
                required
              />
              <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
          </div>
        );
      }
    }

export default SignUp;