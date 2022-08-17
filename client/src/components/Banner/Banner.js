import React from 'react';
import './Banner.css'

export default class Banner extends React.Component {
  constructor(props){
    super(props)
  }
  
  clickAskNew = () => {
    this.props.clickAskNew()
  }
  render() {
    console.log(this.props.user)
    return (
      
        <div className='banner'>
            <li className='banner_left'>{this.props.left}</li>
            <li className='banner_mid'>{this.props.mid}</li>
            {this.props.user ? <li className='banner_right' onClick={this.clickAskNew}>Ask a Question</li> : null}
            
        </div>
    )
  }
}