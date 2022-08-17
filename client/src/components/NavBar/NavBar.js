import React from 'react';
import './NavBar.css'
import { Link, Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user : this.props.user,
            questionPage:this.props.questionPage,
            tagPage : this.props.tagPage,
        }
    }

    clickTag = () => {
        this.setState({
            questionPage:false,
            tagPage:true,
        })
        this.props.showTag()
    }

    clickQuestion = () => {
        this.setState({
            questionPage:true,
            tagPage:false
        })
        if (this.props.user) {
             this.props.showQuestion()
        } else {
            this.props.guestVisit()
        }
       
    }

    logout = () => {
        axios.get("http://localhost:8000/auth/logout")
        this.props.showWelcomePage()
    }

  render() {
    return (
        <div>
            {this.props.user ? 
            // Nav for login user
            <div className='nav'>
            <li className='navtitle'>Fake Stack Overflow</li>
                <li className={this.props.questionPage ? 'clickedbtn' :'navbtn'} onClick = {this.state.questionPage ? null : this.clickQuestion}>Questions</li>
                <li className={this.props.tagPage ? 'clickedbtn' :'navbtn'} onClick = {this.state.tagPage ? null : this.clickTag}>Tags</li>
                <input type='search' placeholder='Search...' ></input>
                <li className='navbtn'>{this.props.username}</li>
                <li className='navbtn' onClick={this.logout}>Log Out</li>
            </div>
            : 
            <div className='nav'>
            <li className='navtitle'>Fake Stack Overflow</li>
                <li className={this.state.questionPage ? 'clickedbtn' :'navbtn'} onClick = {this.state.questionPage ? null : this.clickQuestion}>Questions</li>
                <li className={this.state.tagPage ? 'clickedbtn' :'navbtn'} onClick = {this.state.tagPage ? null : this.clickTag}>Tags</li>
                <input className='navSearch' type='search' placeholder='Search...' ></input>
                <li className='navi'>Guest</li>
            </div>}
        </div>
    )
  }
}