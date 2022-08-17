import React from 'react';
import NavBar from '../NavBar/NavBar';

import './Profile.css'

export default class Profile extends React.Component {
  render() {
    return (
        <div>
            <NavBar />
            <div className='userInfo'>
                <div className='profile_username'>Yuqing Wang</div>
                <input className='logout' type='submit' value='Log Out'></input>
                <div className='regLength'><span>Length of Registration: </span>3 years</div>
                <div className='userReputation'><span>Reputation: </span>350</div>
            </div>

            <div className='userData'>
                <div className='verNav'>
                    <div className='verNav_question'>QUESTION</div>
                    <div className='verNav_answer'>TAG</div>
                    <div className='verNav_tag'>ANSWER</div>
                </div>
                <div ></div>
            </div>
        </div>
    )
  }
}
