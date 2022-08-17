import React from 'react';
import './Register.css'

export default class RegisterPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      users : this.props.users,
      username : '',
      email : '',
      password1: '',
      password2: '',
      alert:'',
    }
    this.handleSubmit.bind(this)
    this.emailChange.bind(this)
    this.usernameChange.bind(this)
    this.password1Change.bind(this)
    this.password2Change.bind(this)
  }

  

  handleSubmit(users){
    let error = false
    if (this.state.username === '') {
      this.setState({alert:'Username could not be empty!'})
      error = true
    }
    else if(this.state.email === ''){
      this.setState({alert:'Email could not be empty!'})
      error = true
    }
    else if(this.state.password1 === ''){
      this.setState({alert:'Password could not be empty!'})
      error = true
    }
    else if(this.state.password2 === ''){
      this.setState({alert:'Password verification could not be empty!'})
      error = true
    }
    else if(this.state.password1!==this.state.password2){
      this.setState({alert: 'Password verification failed.'})
      error = true
    }
    // else if(!this.state.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
    //   error = true
    //   this.setState({alert:"You have entered an invalid email address!"})
    // }
    
    let banned = []
    banned.push(this.state.email.split('@')[0])
    banned.push(this.state.username)
    

    for (let i = 0; i < users.length; i++) {
      if (this.state.email.toLowerCase() === users[i].email.toLowerCase()){
        this.setState({alert:'The email already created an acount.'})
        error = true
        break
      }
      
    }

    // if(!error){
    //   // this.props.showWelcomePage()
    // }
  }

  usernameChange(event){
    this.setState({username: event.target.value})
  }
  emailChange(event){
    this.setState({email: event.target.value})
  }
  password1Change(event){
    this.setState({password1: event.target.value})
  }
  password2Change(event){
    this.setState({password2: event.target.value})
  }

  render() {
    const users = this.props.users
    return (
        <form className='register'>
            <div className='register_webname'>Fake Stack Overflow</div>
            <input className='register_username' type="text" placeholder = "Username" onChange={(event) => this.usernameChange(event)}></input>  
            <input className='register_email' type="text" placeholder = "Email" onChange={(event) => this.emailChange(event)}></input>
            <input className='register_password1' type="text" placeholder = "Password" onChange={(event) => this.password1Change(event)}></input>
            <input className='register_password2' type="text" placeholder = "Password Verification" onChange={(event) => this.password2Change(event)}></input>
            <input type= "button" className = 'register_submit' value="Sign up" onClick={() => this.handleSubmit(users)}></input>
            <p className='reg_alert'>{this.state.alert}</p>
        </form>
    )
  }
}