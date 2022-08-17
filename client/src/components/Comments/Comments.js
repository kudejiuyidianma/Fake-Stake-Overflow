import React from 'react';
import './Comments.css'

export default class Comments extends React.Component {
    constructor(props){
        super(props)

    }
  render() {
      let comments = this.props.comments
      let commentsSetNum = parseInt(comments/3)+1
      let comment = []

      for (let i = 0; i < commentsSetNum; i++) {
          let comment_i = []
          for (let j = 0; j < 3; j++) {
              if (i*3+1 === comments.length()) {
                  break
              }
              comment_i.push(
                <div className='comment'><span>{comments[i*3+1].username}</span>
                <div className='com_text'>{comments[i*3+1].comment}</div>  
                <div className='com_time'>Apr 5, 2020 at 15:25</div> 
                </div>
              )
              
          }
          comment.push(
            <div className='commentset'>
                {comment_i}
            </div>
          )
      }

    return (
        <div>
            {comment}
            <div className='com_page'>
                <div className='prev_com_page'></div>
                <div className='next_com_page'></div>
            </div>
            
        </div>
    )
  }
}