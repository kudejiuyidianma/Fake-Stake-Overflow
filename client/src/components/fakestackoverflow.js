import React from 'react';
import AnswerPage from './AnswerPage/AnswerPage';
import AnswerPart from './AnswerPart/AnswerPart';
import Banner from './Banner/Banner';
import Comments from './Comments/Comments';
import NavBar from './NavBar/NavBar';
import LoginPage from './LoginPage/LoginPage';
import NewQuestion from './NewQuestion/NewQuestion';
import Profile from './Profile/Profile';
import QuestionPage from './QuestionPage/QuestionPage';
import RegisterPage from './RegisterPage/RegisterPage';
import SingleQuestion from './SingleQuestion/SingleQuestion';
import TagPage from './TagPage/TagPage';
import WelcomePage from './WelcomePage/WelcomePage';
import { render } from "react-dom"
import{
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom"
import axios from "axios"
axios.create({ withCredentials: true, })
export default class FakeStackOverflow extends React.Component {
  constructor(props){
    super(props)

    axios.get('http://localhost:8000/questions')
    .then(res => {
    this.setState({question: res.data.reverse()});
    })
    axios.get('http://localhost:8000/tags')
    .then(res => {
    this.setState({tag: res.data});
    })
    axios.get('http://localhost:8000/answers')
    .then(res => {
    this.setState({answer: res.data});
    })
    axios.get('http://localhost:8000/auth')
    .then(res => {
    this.setState({users: res.data});
    })
    axios.post('http://localhost:8000/auth/login',{
      email:'Yuqing.wang.1@stonybrook.edu',
      password:'1234567890'
    }).then(res => {console.log('sdf');})
    axios.get('http://localhost:8000/auth/current')
    .then(res => {
      console.log(res)
      if (res.data === null) {
        this.setState({user:false})
      }
      else{
        this.setState({
          user:true,
          username:res.data.username
        })
      }
    })
    this.state={
      // show pages or not
      showWelcomePage : true,
      showRegister: false,
      showHomePage : false,
      showLogin : false,
      user : true,
      username:'Yuqing',
      showTag : false,

      showSingleQuestionPage : false,
      showSingleTag : false,
      singleTagName : '',
      showAskForm : false,
      // showAnswerForm : false,
      // showSearch : false,
      // noQuestionFound : false,


      //data Sets
      question:[],
      tag:[],
      answer:[],
      users:[],
      singleQuestion : [],
      singleTag : [],
      searchKey : '',


      //alerts
      loginAlert : '',
    }
    this.singleQuestion.bind(this)
  }

  displayNone = () => {
    this.setState({
      showWelcomePage : false,
      showRegister:false,
      showHomePage:false,
      showLogin:false,
      loginAlert:'',
      showTag : false,
      showSingleTag : false,
      showSingleQuestionPage:false, 
      showAskForm:false,
    })
    axios.get('http://localhost:8000/questions')
    .then(res => {
    this.setState({question: res.data.reverse()});
    })
    axios.get('http://localhost:8000/tags')
    .then(res => {
    this.setState({tag: res.data});
    })
    axios.get('http://localhost:8000/answers')
    .then(res => {
    this.setState({answer: res.data});
    })
    axios.get('http://localhost:8000/auth')
    .then(res => {
    this.setState({users: res.data});
    })
  }

  showWelcomePage = () => {
    this.displayNone()
    this.setState({
      showWelcomePage : true,
      user:true})
  }

  getUsername = (username) => {
    this.setState({user:true})
    this.setState({username:username})
  }

  loginError = (alert) => {
    this.displayNone()
    this.setState({
      loginAlert : alert,
      showLogin : true
    })
  }

  showRegister = () => {
    this.displayNone()
    this.setState({showRegister : true})
  }

  guestVisit = () => {
    this.displayNone()
    this.setState({
      user:false,
      showHomePage:true
    })
  }


  showHomePage = () => {
    this.displayNone()
    this.setState({
      user:true,
      showHomePage : true})
  }

  showTag = () => {
    this.displayNone()
    this.setState({
      showTag:true,
      showSingleTag:false,
    })
  }

  clickAskNew = () => {
    this.displayNone()
    this.setState({showAskForm:true})
}

singleQuestion = (singleQuestion) =>{
  this.displayNone()
  // this.setState({showSingleQuestionPage:true, showHomePage:false})
  // this.setState({singleQuestion:singleQuestion})
  this.state.singleQuestion=singleQuestion
  this.state.showSingleQuestionPage = true
  this.state.showHomePage = false
  
}

singleTag = (data) => {
  this.displayNone()
  this.setState({showSingleTag : true,
  showHomePage:false, guestVisit:false, showTag:false})
  // this.setState({singleTag : singleTag})
  this.state.singleTag = data[1]
  this.state.singleTagName = data[0]
}



searchPage = (singleTag) => {
if (singleTag.length == 1 || singleTag.length == 0) {
  this.displayNone()
  this.setState({noQuestionFound : true})
} else {
  this.displayNone()
  this.setState({showSearch : true})
  this.state.singleTag = singleTag
}

}

  render() {
  


    return (
      <BrowserRouter >
        <Routes>
          <Route path = "/" element = 
            {
            <div>
              {this.state.showLogin ? <Navigate replace to = "login" /> : null}
              {this.state.showRegister ? <Navigate replace to = "register" /> : null}
              {this.state.showHomePage ? <Navigate replace to = {this.state.user ? this.state.username + "/questions" : 'guest/questions'} /> : null}
              {this.state.showWelcomePage ? <div>
                <WelcomePage 
            // the user choose to login
            showHomePage = {this.showHomePage}
            getUsername= {(username) => {this.getUsername(username)}}
            users = {this.state.users}
            loginError = {(alert) => {this.loginError(alert)}}
            // the user choose to register
            showRegister =  {this.showRegister}
            // the user choose to continue as a guest
            guestVisit = {this.guestVisit}
          />
              </div>:null}
            </div>}
          />

          {/* Register Page */}
          <Route path = 'register' element = { <div>
            <RegisterPage 
              users = {this.state.users}
              showWelcomePage = {this.showWelcomePage}
            />
          </div>}/>

          {/* Login Page */}
          <Route path = 'login' element = {<LoginPage 
          showHomePage = {this.showHomePage}
          getUsername= {(username) => {this.getUsername(username)}}
          users = {this.state.users}
          loginError = {(alert) => {this.loginError(alert)}}
          alert = {this.state.loginAlert} />}/>

            {/* Question Page */}
          <Route path = {this.state.user ? ":username/questions" : 'guest/questions'} element = {
            <div>
              {this.state.showTag ? <Navigate to = {this.state.user ? "/" + this.state.username +"/tags" : '/guest/tags'}/> : null}
              {this.state.showSingleQuestionPage ? <Navigate replace to = 
              {this.state.user ? "/" + this.state.username +"/question/"+this.state.singleQuestion._id : '/guest/question/' + this.state.singleQuestion._id } 
              /> : null}
              {this.state.showAskForm ? <Navigate to = "/asknew" /> : null}
              <NavBar 
              questionPage = {this.state.showHomePage}
              username = {this.state.username}
              user = {this.state.user}
              showWelcomePage = {this.showWelcomePage}
              showTag = {this.showTag}
            />
            <Banner 
              left = {this.state.question.length+' questions'}
              mid = "All Questions"
              user = {this.state.user}
              clickAskNew = {this.clickAskNew}
            />

            <QuestionPage 
            user = {this.state.user}
            username = {this.state.username}
            questionSet = {this.state.question}
            tagSet = {this.state.tag}
            answerSet = {this.state.answer}
            model = {this.state.model}
            clickSingleTitle = {(singleQuestion) => {this.singleQuestion(singleQuestion)}}
          />
            </div>
          }/>

          {/* Tag Page */}
          <Route path = {this.state.user ? ":username/tags" : 'guest/tags'} element ={
            <div>
              {this.state.showSingleTag ? <Navigate replace to = 
              {this.state.user ? "/" + this.state.username +"/tag/"+this.state.singleTag.name : '/guest/tag/' + this.state.singleTag.name } 
              /> : null}
            {this.state.showHomePage ? <Navigate replace to = {this.state.user ? "/" + this.state.username +"/questions" : '/guest/questions'}/> : null}
               <NavBar 
              username = {this.state.username}
              user = {this.state.user}
              showTag = {this.showTag}
              questionPage = {this.state.showHomePage}
              guestVisit = {this.guestVisit}
              showQuestion = {this.showHomePage}
              showWelcomePage = {this.showWelcomePage}
            />
            <Banner 
                left = {this.state.tag.length + ' Tags'}
                mid = 'All Tags'
                clickAskNew = {this.clickAskNew}
            />
            <TagPage 
              tagSet = {this.state.tag}
              questionSet = {this.state.question}
              clickSingleTag = {(data) => {this.singleTag(data)}}
            />
            </div>
          }/>

          {/* Single Question Page */}
          <Route path={this.state.user ? "/:username/question/:_id" : '/guest/question/:_id'} element ={
            <div>
              {this.state.showTag ? <Navigate to = {this.state.user ? "/" + this.state.username +"/tags" : '/guest/tags'}/> : null}
              {this.state.showHomePage ? <Navigate replace to = {this.state.user ? "/" + this.state.username +"/questions" : '/guest/questions'}/> : null}
             <NavBar 
              username = {this.state.username}
              user = {this.state.user}
              tagPage = {this.state.showTag}
              questionPage = {this.state.showHomePage}
              guestVisit = {this.guestVisit}
            />
            <Banner 
                left = {''}
                mid = {''}
                clickAskNew = {this.clickAskNew}
            />
            <AnswerPage
              questionInfo = {this.state.singleQuestion}
              clickSingleTitle = {(singleQuestion) => {this.singleQuestion(singleQuestion)}}
              user = {this.state.user}
              username = {this.state.username}
            />
            </div>
          }/>

          {/* Single Tag Page */}
          <Route path =  {this.state.user ? "/:username/tag/:_id" : '/guest/tag/:_id'} element ={
            <div>
              {this.state.showTag ? <Navigate to = {this.state.user ? "/" + this.state.username +"/tags" : '/guest/tags'}/> : null}
              {this.state.showHomePage ? <Navigate replace to = {this.state.user ? "/" + this.state.username +"/questions" : '/guest/questions'}/> : null}
            
              <NavBar 
                username = {this.state.username}
                user = {this.state.user}
                showTag = {this.showTag}
                questionPage = {this.showHomePage}
                guestVisit = {this.guestVisit}
              />
              <Banner 
                  left = {this.state.singleTag.length + ' Questions'}
                  mid = {'Questions tagged [' + this.state.singleTagName + ']'}
                  clickAskNew = {this.clickAskNew}
              />
              <QuestionPage 
                questionSet = {this.state.singleTag}
                model = {this.state.model}
                clickSingleTitle = {(singleQuestion) => {this.singleQuestion(singleQuestion)}}
              />
            </div>
          }/>

          <Route path = '/asknew' element ={
            <div>
              <NavBar 
                username = {this.state.username}
                user = {this.state.user}
                showTag = {this.showTag}
                questionPage = {this.showHomePage}
                guestVisit = {this.guestVisit}
              />
              <NewQuestion 
                tagSet = {this.state.tag}
                question = {this.state.question}
              />
            </div>
          }/>
        </Routes>
      </BrowserRouter>
    )
  }
}
