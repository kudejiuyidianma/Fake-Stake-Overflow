import axios from 'axios';
import React from 'react';
import AnswerPart from '../AnswerPart/AnswerPart';
import Comments from '../Comments/Comments';
import NavBar from '../NavBar/NavBar';

import './AnswerPage.css'
export default class AnswerPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    voteAdd = () => {
        this.props.questionInfo.votes += 1
        axios.put("http://localhost:8000/questions/" + this.props.questionInfo._id, this.props.questionInfo).then(res =>{
            this.props.clickSingleTitle(this.props.questionInfo)
        })
    }

    voteSub = () => {
        this.props.questionInfo.votes -= 1
        axios.put("http://localhost:8000/questions/" + this.props.questionInfo._id, this.props.questionInfo).then(res =>{
            this.props.clickSingleTitle(this.props.questionInfo)
        })
    }

  render() {
      let question = this.props.questionInfo
      const tagSet = this.props.questionInfo.tags
      let on = question.createdAt.split('T')[0]
      let at = question.createdAt.split('T')[1]
      const date = on.split('-')
        const monthNum = date[1]
        var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        const monthName = months[parseInt(monthNum-1)]
        const day = date[2]
        const year = date[0]
        on = monthName + " " + day + ", " + year
        const time = at.substring(0,5)
    const tagNum = tagSet.length
    const tagrowNum = parseInt(tagNum/4)+1
    const tagItem = []
    for (let i = 0; i < tagrowNum; i++) {
      const tagrow_i = []
      for (let j = 0; j < 4; j++) {
        if (4*i+j === tagSet.length) {
          break
        }
        tagrow_i.push(<div className='ap_tag_cell'>{tagSet[4*i+j]}</div>)
      }
      tagItem.push(<div className='ap_tag' >{tagrow_i}</div>)
    }
    return (
    <div className='asPage'>
        <div className='question_part_in_answer_page'>
            <div className='vote_question'>
                <div className='upvote_question' onClick={this.voteAdd}></div>
                <div className='vote_num_question'>{this.props.questionInfo.votes}</div>
                <div className='downvote_question' onClick={this.voteSub}></div>
            </div>
            <div className='qp_question'>
                <div className='ap_qtitle'>{question.title}</div>
              
                <div className='ap_qprop'>
                    <div className='ap_view'>{question.views+' views'}</div>
                    <div className='ap_ans'>{question.answers.length + ' answers'}</div>
                </div>
                <div className='ap_qsum'>
                    <span>Summary: </span>{question.summary}
                </div>
                {tagItem}
                <p className='ap_askerInfo'>
                    <div className='ap_asker_username'><span>asked by user: </span> {question.asked_by} </div>
                    
                    <div className='ap_askat'><span> at: </span> {on} </div>
                    
                    <div className='ap_askon'><span> on: </span> {time}</div>
                </p>
                <Comments 
                    comments = {this.props.questionInfo.comments}
                />
            </div>
            
        </div>
        <div >
            <div className='ap_ansNum'>{question.answers.length + ' Answers'}</div>
            <div>
                <AnswerPart 
                    questionInfo = {this.props.questionInfo}
                    answers = {question.answers}
                    clickSingleTitle = {this.props.clickSingleTitle}
                />
            </div>
        </div>

        <div className='page_footer'>
              <div className='new_ans_btn'>Add Answer</div>
            </div>
        {/* <textarea className='new_ans' rows= '20' cols ="150" name="text" style={{resize : 'none'}}></textarea> */}
    </div>
    )
  }
}