import axios from 'axios';
import React from 'react';
import Comments from '../Comments/Comments';
import './AnswerPart.css'

//single answer part in answer page
export default class AnswerPart extends React.Component {
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

    voteAdd = (i, e) => {
        this.props.answers[i].votes += 1
        // this.props.questionInfo.votes += 1
        axios.put("http://localhost:8000/questions/" + this.props.questionInfo._id, this.props.questionInfo).then(res =>{
            this.props.clickSingleTitle(this.props.questionInfo)
        })
    }

    voteSub = (i, e) => {
        this.props.answers[i].votes -= 1
        // this.props.questionInfo.votes -= 1
        axios.put("http://localhost:8000/questions/" + this.props.questionInfo._id, this.props.questionInfo).then(res =>{
            this.props.clickSingleTitle(this.props.questionInfo)
        })
    }

  render() {
    let answers = this.props.answers
    let questionPageNum = parseInt(answers.length/5)+1
    let questionList = []
    for (let i = 0; i < questionPageNum; i++) {
        const questionList_i = []
        for (let j = 0; j < 5; j++) {
            if (i*5+j===answers.length) {
                break
              }
            let on = answers[i*5+j].createdAt.split('T')[0]
            let at = answers[i*5+j].createdAt.split('T')[1]
            const date = on.split('-')
            const monthNum = date[1]
            var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            const monthName = months[parseInt(monthNum-1)]
            const day = date[2]
            const year = date[0]
            on = monthName + " " + day + ", " + year
            const time = at.substring(0,5)
            questionList_i.push(
                <div className='single_ans'>
            <div className='ans_grid'>
                <div className='ans_vote'>
                    <div className='upvote_answer' onClick={(e) => this.voteAdd(i*5+j, e)}></div>
                    <div className='vote_num_ans'>{answers[i*5+j].votes}</div>
                    <div className='downvote_ans' onClick={(e) => this.voteSub(i*5+j, e)}></div>
                </div>
                <div className='ans_text'>{answers[i*5+j].text}</div>    
            </div>
            
            
            <div className='ans_time'>
                <span>Answered </span>{on}
                <span> at </span>
                 {time}
            </div>
            <div className='ans_by'><span>Answered by </span> {answers[i*5+j].ans_by} </div>
            
            <Comments comments = {answers[i*5+j].comments}/>
           
        </div>
            )
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
        <div>
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
        </div>
        
    )
  }
}
