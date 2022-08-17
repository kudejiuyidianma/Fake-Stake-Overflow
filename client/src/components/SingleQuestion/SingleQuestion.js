import axios from 'axios';
import React from 'react';
import './SingleQuestion.css'

export default class SingleQuestion extends React.Component {
  constructor(props){
    super(props)
    
  }
  clickSingleTitle = () => {
    this.props.data.views = this.props.data.views+1
    axios.put("http://localhost:8000/questions/"+this.props.data._id, this.props.data).then(res =>{
      this.props.clickSingleTitle(this.props.data)
    }
    )
    
  }
  render() {
    const tagSet = this.props.data.tags
    console.log(tagSet)
    const tagNum = this.props.data.tags.length
    const tagrowNum = parseInt(tagNum/4)+1
    const tagItem = []
    for (let i = 0; i < tagrowNum; i++) {
      const tagrow_i = []
      for (let j = 0; j < 4; j++) {
        if (4*i+j === tagSet.length) {
          break
        }
        tagrow_i.push(<div className='sq_tag_cell'>{tagSet[4*i+j]}</div>)
      }
      tagItem.push(<div className='sq_tag' >{tagrow_i}</div>)
    }
    return (
        <div className='singleQuestion'>
          <div className='sq_left'>
            <div className='sq_view'>{this.props.data.views+ ' Views'}</div>
            <div className='sq_a'>{this.props.data.answers.length+ ' Answers'}</div>
            <div className='sq_vote'>{this.props.data.votes+ ' Votes'}</div>
          </div>
          <div className='sq_mid'>
            <div className='sq_title' onClick={this.clickSingleTitle}>{this.props.data.title}</div>           
            <div className='sq_box1'>
             <div className='sq_sum'>
              <span>Summary: </span>{this.props.data.summary}</div>
            </div>
                {tagItem}
          </div>
          <div className='sq_right'>
          <div>
              <div className='sq_asker'><span>Asked By </span>{this.props.data.asked_by} </div>

            </div>
            <div>
              <div className='sq_on'><span>On: </span>{this.props.data.createdAt.split('T')[0]}</div>
            </div>
            <div>
              <div className='sq_at'><span>At: </span>{this.props.data.createdAt.split('T')[1]} </div>
            </div>
          </div>
        </div>
    )
  }
}
