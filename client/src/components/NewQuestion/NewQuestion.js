import axios from 'axios';
import React from 'react';
import NavBar from '../NavBar/NavBar';
import './NewQuestion.css'

export default class NewQuestion extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            alert:'',
            title:'',
            summary:'',
            text:'',
            tags:[],
        }
    }
    titleChange = (event) => {
        this.setState({title : event.target.value})
      }
    
    summaryChange = (event) => {
      this.setState({summary : event.target.value})
    }
    
    textChange = (event) => {
      this.setState({text : event.target.value})
    }

    tagsChange = (event) => {
        this.setState({tags : event.target.value})
    }


    handleSubmit = () => {
        console.log('correct')
    }

    // handleSubmit = (event) => {
    //     console.log('567890')
    //     alert()
    //     let error_flag = false
    //     let titleSize = this.state.title.length
    //     if (titleSize > 50) {
    //         this.setState({alert :  'Title cannot be more than 50 characters!'})
    //         error_flag = true
    //     }
        
    //     if(titleSize == 0){
    //         this.setState({alert :  'Title cannot be empty!'})
    //         error_flag = true
    //     }
    //     let summarysize = this.state.summary.length
    //     if(summarysize > 140){
    //         this.setState({alert :  'Summary cannot be more than 100 characters!'})
    //         error_flag = true
    //     }
    //     let textSize = this.state.text.length
    //     if(textSize == 0){
    //         this.setState({alert :  'Text cannot be empty!'})
    //         error_flag = true
    //     }
    //     let tagSize = this.state.questiontag.length
    //     if (tagSize == 0) {
    //         this.setState({alert :  'Tag cannot be empty!'})
    //         error_flag = true
    //     }


    //     // if(!error_flag){
    //     //     let tagList = this.state.questiontag.split(' ')
    //     //     let tags = []
    //     //     let addedTag = []
    //     //     for (let i = 0; i < tagList.length; i++) {
    //     //         if(tagList[i] != ''){ // tag is not empty
    //     //             let newTag = tagList[i].toLowerCase() // tag should be case-insensitive
    //     //             let tagFlag = false // true if already have a same tag
    //     //             for (let j = 0; j < this.props.tagSet.length; j++) {
    //     //                 if(newTag == this.props.tagSet[j].name){
    //     //                     tagFlag = true
    //     //                     tags.push(this.props.tagSet[j])
    //     //                 }
    //     //                 else{
    //     //                     continue
    //     //                 }      
    //     //             }
    //     //             if (tagFlag == false) { // we need to add a new tag info in the model
    //     //                 //if addedTag does not exist same tag => push
    //     //                 let sameadded = false
    //     //                 for (let addIndex = 0; addIndex < addedTag.length; addIndex++) {
    //     //                     if (newTag == addedTag[addIndex]) {
    //     //                         sameadded = true
    //     //                     }   
    //     //                 }
    //     //                 if(!sameadded){
    //     //                     addedTag.push(newTag)
    //     //                 }  
    //     //             }
    //     //         }
    //     //         else{
    //     //             continue
    //     //         }
    //     //     }

            
    //     //     // loop new tags name and give them tid then push into model
    //     //     for (let j = 0; j < addedTag.length; j++) {
    //     //         let newTagInfo = {
    //     //             name: addedTag[j],
    //     //         }
    //     //         // this.props.tagSet.unshift(newTagInfo) 
    //     //         if (j == addedTag.length-1) {
    //     //             axios.post("http://localhost:8000/tags", newTagInfo)
    //     //         .then(res => {
    //     //             this.props.tagSet.unshift(res.data)
    //     //             tags.push(res.data)
    //     //             if(this.state.asker == ""){
    //     //                 this.setState({asker:"Anonymous"})
    //     //             }
    //     //             let newQuestion = {
    //     //                 title: this.state.questiontitle,
    //     //                 text: this.state.questiontext,
    //     //                 tags: tags,
    //     //                 asked_by : this.state.asker,
    //     //             }
                    
    //     //             axios.post("http://localhost:8000/questions", newQuestion)
    //     //                 .then(res => {
    //     //                     this.props.question.unshift(res.data)
    //     //                     })
                            
    //     //             })
    //     //         } else {
    //     //             axios.post("http://localhost:8000/tags", newTagInfo)
    //     //         .then(res => {
    //     //             this.props.tagSet.unshift(res.data)
    //     //             tags.push(res.data)
    //     //             })
    //     //         }
                
    //     //     }
    //     //  }   

    //     event.preventDefault();
    // }

  render() {
    return (
            <form className='askForm' onSubmit={this.handleSubmit}>
            <p className='nqalert'>{this.state.alert+'000'}</p>
            <div className="newQuestionTitle">
                <h1 className='newQuestionHeader'>Question Title</h1>
                <p className="newQuestionAlert">Title should not be more than 50 characters.</p>
                <textarea  rows="2" cols="60" name="text" style={{resize: 'none'}} 
                type = "text" onChange={this.titleChange}></textarea>
            </div>
        
            <div className="newQuestionSummary">
                <h1 className="newQuestionHeader">Question Suumary</h1> 
            <p className="newQuestionAlert">Summary should not more than 140 characters.</p>
            <textarea rows="3" cols="60" name="text" style={{resize: 'none'}}
            type = "text" onChange={this.summaryChange}></textarea>
            </div>
            
            <div className="newquestionText">
                <h1 className="newQuestionHeader">Question Text</h1> 
                <p className="newQuestionAlert">Add details.</p>
                <textarea rows="5" cols="60" name="text" style={{resize: 'none'}}
                type = "text" onChange={this.textChange}></textarea>
            </div>

            
            <div className="newQuestionTags">
                <h1 className="newQuestionHeader">Tags</h1>
                <p className="newQuestionAlert">Add Keywords separated by whitespace.</p> 
                <textarea rows="2" cols="60" name="text" style={{resize: 'none'}}
                    type = "text" onChange={this.tagsChange}></textarea>
            </div>
            
            <input type="submit" className="postQuestion" value="Post Question"></input>
        </form>
    )
  }
}
