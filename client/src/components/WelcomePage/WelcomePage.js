import axios from 'axios';
import React from 'react';
import "./WelcomePage.css"
export default class WelcomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email:'',
      password:'',
    }
    this.handleClick1.bind(this)
    this.handleClick2.bind(this)
  }

  

  handleClick1 = () => {
    this.props.getUsername("Yuqing")
    this.props.showHomePage()
    // let users = this.props.users
    // let username = ''
    // let emailwrong = true
    // let passwrong = true
    // if(!this.state.email){
    //   this.props.loginError('Email could not be empty.')
    // }
    // else if(!/\S+@\S+\.\S+/.test(this.state.email.toLowerCase())){
    //   this.props.loginError('The email you entered is not valid.')
    // }
    // if(!this.state.password){
    //   this.props.loginError('Password could not be empty.')
    // }
    // let flag = false
    // for (let i = 0; i < this.props.users.length; i++) {
    //   if(this.state.email.toLowerCase() === this.props.users[i].toLowerCase()){
    //     flag = true
    //   }
      
    // }
    // if (!flag) {
    //   this.props.loginError('The email you entered is not connected to an account.')
    // }
    // try {
    //   axios.post("http://localhost:8000/auth/login",{email:this.state.email, password:this.state.password})
    // } catch (error) {
    //   if(error.response && error.response.status === 401){
    //     this.props.loginError('Email or password invalid')
    //   }
    //   else{
    //     this.props.loginError('Network Error!')
    //   }
    // }
    
    // else{
    //   this.props.getUsername(username)
    //   this.props.showHomePage()
    // }
    
  }

  handleClick2 = () => {
    this.props.showRegister()
  }

  handleClick3 = () => {
    this.props.guestVisit()
  }
  
  emailChange = (event) => {
    this.setState({email : event.target.value})
  }

  passChange = (event) => {
    this.setState({password : event.target.value})
  }


  render() {
    return (
        <div className='welcome'>
            <div className='webname'>Fake Stack Overflow</div>  
            <form className='userOptions'>
                <input className='email' placeholder = "Email" type="text" onChange={this.emailChange}></input>
                <input className='password' placeholder = "Password" onChange={this.passChange}></input>
                <input type= "button" className = 'submit1' value="Log In" onClick={this.handleClick1} ></input>
                <input type= "button" className = 'submit2' value="Don't have an account? Sign Up" onClick={this.handleClick2}></input>
                <input type= "button" className = 'submit3' value="Continue as a Guest" onClick={this.handleClick3}></input>
            </form>
            <div className='slogan'>A public platform building the definitive collection of coding questions and answers</div>
        </div>
        
    )
  }
}