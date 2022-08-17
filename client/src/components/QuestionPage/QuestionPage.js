import React from 'react';
import NavBar from '../NavBar/NavBar';
import SingleQuestion from '../SingleQuestion/SingleQuestion';
import Banner from '../Banner/Banner';
import './QuestionPage.css'

export default class QuestionPage extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      onepage:false,
      fisrtPage:true,
      midPage: false,
      lastPage:false,
      questionList : [],
      pageNum:0,
      currentPage:0,
    }
  }

  

  
  nextPage = () => {
    const newpage = this.state.currentPage+1
    this.setState({currentPage:newpage})
    this.setState({fisrtPage:false,
    midPage:true, lastPage:false})
    if(newpage === this.state.pageNum-1){
      this.setState({lastPage:true,
      midPage:false})
    }

  }

  prevPage = () => {
    const newpage = this.state.currentPage-1
    this.setState({currentPage:newpage})
    this.setState({lastPage:false,
    midPage:true, fisrtPage:false})
    if(newpage === 0){
      this.setState({fisrtPage:true,
      midPage:false})
    }
  }

  render() {
    // console.log(this.props.user)
    let questionSet = this.props.questionSet
    let questionPageNum = parseInt(questionSet.length/5)+1
    let questionList = []
    for (let i = 0; i < questionPageNum; i++) {
      const questionList_i = []
      for (let j = 0; j < 5; j++) {
        if (i*5+j===questionSet.length) {
          break
        }
        questionList_i.push(<SingleQuestion key={j} data = {questionSet[i*5+j]} 
          answerSet = {this.props.answerSet} 
          clickSingleTitle = {this.props.clickSingleTitle}
          />)
        
      }
      questionList.push(questionList_i)
    }
    

    this.state.pageNum = questionPageNum
    this.state.questionList = questionList[this.state.currentPage]

    // check if only one page
    if (questionPageNum === 1) {
      this.state.fisrtPage=false
      this.state.lastPage = false
      this.state.midPage = false
      this.state.onepage = true
    }
    else{
      this.state.fisrtPage=true
      this.state.lastPage = false
      this.state.midPage = false
      this.state.onepage = false

    }
    
    
    

    return (
        <div className='questionPage'>
          
          {this.state.onepage ? 
          <div>
              {this.state.questionList}
              <div className='q_page'>
              <div className='first_q_page'></div>
              <div className='last_q_page'></div>
            </div>
            </div>
            :
            null
          }
          
          {this.state.fisrtPage ? 
          <div>
              {this.state.questionList}
              <div className='q_page'>
              <div className='first_q_page'></div>
              <div className='next_q_page' onClick={this.nextPage}></div>
            </div>
            </div>
            :
            null
          }

          {this.state.midPage ? 
          <div>
          {this.state.questionList}
          <div className='q_page'>
          <div className='prev_q_page' onClick={this.prevPage}></div>
          <div className='next_q_page' onClick={this.nextPage}></div>
        </div>
        
        </div> : null}

          {this.state.lastPage ? <div>
          {this.state.questionList}
          <div className='q_page'>
          <div className='prev_q_page' onClick={this.prevPage}></div>
          <div className='last_q_page'></div>
        </div>
        
        </div>  : null}            
        </div>
    )
  }
}