import React from 'react';
import './TagPage.css'

export default class TagPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tagname : '',
            questionlist : [],
        }
    }

    clickSingleTag = (name, questionlist) => {
        let data = []
        data.push(name)
        data.push(questionlist)
        this.props.clickSingleTag(data)
        
    }

    findTagQues = (name, questions) => {
        var tagq = []
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].tags.length; j++) {
                if (name === questions[i].tags[j]) {
                    tagq.push(questions[i])
                    break
                }
                
            }
            
        }
        return tagq
    }

  render() {
    //   console.log(this.props.user)
      let tags = this.props.tagSet
      let questions = this.props.questionSet

      let tagRowNum = parseInt(tags.length/3)+1
      let allTag = []
      for (let i = 0; i < tagRowNum; i++) {
          let tag_i = []
          for (let j = 0; j < 3; j++) {
              if(i*3+j === tags.length){
                  break
              }
              const tag_i_name = tags[i*3+j].name
              let qset = this.findTagQues(tag_i_name, questions)
              let tag_i_num = qset.length
              tag_i.push(
            
                <li className='tagi' key={i*3+j}>
                <a className='tagi_name' onClick={() => {this.clickSingleTag(tag_i_name, qset)}}>{tag_i_name} </a>
                <div className='tagi_num'>{tag_i_num + ' questions'}</div>
                </li>
              )
          }
          allTag.push(
              <div className='tag_set' key={'tag_row'+i}>{tag_i}</div>
          )
      }
    return (
        <div>
           {allTag}
        </div>
    )
  }
}