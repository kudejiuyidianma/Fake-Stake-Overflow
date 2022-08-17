import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router-dom';
import "./LoginPage.css"
export default class LoginPage extends React.Component {

  constructor(props){
    super(props)
    this.state={
      email:'',
      password:''
    }
    
  }

  emailChange = (event) => {
    this.setState({email : event.target.value})
  }

  passChange = (event) => {
    this.setState({password : event.target.value})
  }

  handleClick = () => {
    if(!this.state.email){
      this.props.loginError('Email could not be empty.')
    }
    else if(!/\S+@\S+\.\S+/.test(this.state.email.toLowerCase())){
      this.props.loginError('The email you entered is not valid.')
    }
    if(!this.state.password){
      this.props.loginError('Password could not be empty.')
    }
    let flag = false
    for (let i = 0; i < this.props.users.length; i++) {
      if(this.state.email === this.props.users[i]){
        flag = true
      }
      
    }
    if (!flag) {
      this.props.loginError('The email you entered is not connected to an account.')
    }
    try {
      axios.post("http://localhost:8000/auth/login",{email:this.state.email, password:this.state.password}).then(res=>{
        
        console.log(res.data)
      })
      // if(res.statues === 0){
      // }
    } catch (error) {
      if(error.response && error.response.status === 401){
        this.props.loginError('Email or password invalid')
      }
      else{
        this.props.loginError('Network Error!')
      }
    }
    
  }

  render() {
    
    return (
        <form className='login'>
            <div className='login_webname'>Fake Stack Overflow</div>  
            <p className='loginalert'>{this.props.alert}</p>
            <input className='login_email' placeholder = "Email" onChange={this.emailChange}></input>
            <input className='login_password' placeholder = "Password" onChange={this.passChange}></input>
            <input type= "button" className = 'login_submit' value="Log In" onClick={this.handleClick}></input>
        </form>
        
    )
  }
}