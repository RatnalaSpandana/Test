import React, { useEffect } from 'react';
import logo from '../resources/logo.png';
import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
import DirectCall from './components/DirectCall/DirectCall';
import { connect } from 'react-redux';
import DashboardInformation from './components/DashboardInformation/DashboardInformation';
import { callStates } from '../store/actions/callActions';
import GroupCallRoomsList from './components/GroupCallRoomsList/GroupCallRoomsList';
import GroupCall from './components/GroupCall/GroupCall';
import {Chat} from "./components/ChatBox/chat";
// import Chat from "./components/ChatBox/Components/ChatBox.js/chatBox";
import Chat2 from "./components/ChatBox/Components/ChatBox.js/chatBox2";
import Chat3 from "./components/ChatBox/Components/ChatBox.js/chatBox3";
import './Dashboard.css';


const Dashboard = ({ username, callState }) => {
  useEffect(() => {
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
  }, []);

  localStorage.setItem('user', username);

  return (
    <div className='dashboard_container background_main_color'>
      <div className='dashboard_left_section'>
        <div className='dashboard_content_container'>
          <DirectCall />
          <GroupCall />
          {callState !== callStates.CALL_IN_PROGRESS && <DashboardInformation username={username} />}
        </div>
        <div className='dashboard_rooms_container background_secondary_color'>
          <GroupCallRoomsList />
          <div style={{marginLeft:'20%', zIndex:1000 ,display:'grid' , gridTemplateColumns:'1fr 1fr 1fr'}}>
            <div style={{backgroundColor:'white'}}>
            <Chat style={{backgroundColor:'white'}} username={username} to={'poco'}></Chat>
   </div>
            <div  style={{backgroundColor:'white',marginLeft:'10%'}}>
            <Chat2 style={{background:'white'}}/>
            </div>
            <div  style={{backgroundColor:'white',marginLeft:'10%'}}>
            <Chat3 style={{background:'white'}}/>
            </div>
            </div>
        </div>
      </div>
      <div className='dashboard_right_section background_secondary_color'>
        <div className='dashboard_active_users_list'>
          <ActiveUsersList />
        </div>
        <div className='dashboard_logo_container'>
          <img className='dashboard_logo_image' src={logo} />
        </div>
      </div>
    </div>
  );
};



const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard
});

export default connect(mapStateToProps)(Dashboard);