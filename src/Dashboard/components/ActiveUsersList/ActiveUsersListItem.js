import React from 'react';
import userAvatar from '../../../resources/userAvatar.png';
import { callToOtherUser } from '../../../utils/webRTC/webRTCHandler';
import { callStates } from '../../../store/actions/callActions';
import { FcVideoCall } from 'react-icons/fc';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { openChat } from "../ChatBox/chat";

const ActiveUsersListItem = (props) => {
  const { activeUser, callState } = props;

  const handleListItemPressed = () => {
    if (callState === callStates.CALL_AVAILABLE) {
      callToOtherUser(activeUser);
    }
  };

  return (
    <div className='active_user_list_item' >
      <div className='active_user_list_image_container'>
        <img style={{width:40}} className='active_user_list_image' src={userAvatar} />
      </div>
      <span className='active_user_list_text'>{activeUser.username}</span>

      <FcVideoCall onClick={handleListItemPressed} style={{height:30,width:30,marginLeft:10}}/>
      {/* <BiMessageRoundedDetail onClick={()=>{openChat(activeUser.username)}} style={{height:30,width:30,marginLeft:10}}/> */}
    </div>
  );
};

export default ActiveUsersListItem;
