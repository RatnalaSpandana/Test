import React , {useState} from "react";
// import './Post.css'
import UseFirestore from "../../Firebase/UseFirestore";
import  {projectStorage , projectFirestore , timestamp}  from '../../Firebase/FirebaseConfig';
import moment from 'moment';
import './style.css'
import { FcVideoCall } from 'react-icons/fc';
import { callToOtherUser } from '../../../../../utils/webRTC/webRTCHandler';
import { callStates } from '../../../../../store/actions/callActions';
import { AiOutlineClose } from 'react-icons/ai';


function Chatbox( props ){

    const { docs  } = UseFirestore(props.username);
    const [msg, setMsg] =  useState('');
    const [username, setUsername] = useState('')
    const [to, setTo] = useState(props.to)
    const { activeUser, callState } = props;

    let userName = props.username
    let Recciptant = props.to

    function ChnageHandler(e){
       
        let msg_ = msg
        const createdAt = timestamp();
        
        projectFirestore.collection(userName).add({ msg , createdAt ,userName,Recciptant});
        projectFirestore.collection(Recciptant).add({ msg , createdAt ,userName,Recciptant});
        document.getElementById('chat-box-input').value=''
        
    }

    const handleListItemPressed = () => {
        if (callState === callStates.CALL_AVAILABLE) {
          callToOtherUser(activeUser);
        }
      };

    const HandleClose = () =>{
        // alert('hello')
        document.getElementsByClassName("message-box").width = '40px';
        document.getElementsByClassName("message-box").height = '40px';
        document.getElementById('change-width').width='50vw';
    }

    const HnadleOpen = () =>{
        document.getElementsByClassName("message-box").width = '340px';
    }

    
    // console.log(moment().calendar(docs[3].createdAt) , moment(docs[3].createdAt.toDate ( )).fromNow(),docs[3].createdAt.seconds )

    return (
        <div>
            
        <div className='message-box'>
            <div style={{backgroundColor:'black',height:50 ,display:'grid' ,gridTemplateColumns:'2fr 2fr 40px ',alignItems:'center'}} >
            <div style={{}}>
            <span style={{marginLeft:40 ,fontSize:25 }} >{props.to}</span>
            </div>
            <div >
            <FcVideoCall onClick={handleListItemPressed} style={{height:30,width:30 }}/>
            </div>
            <div >
            <AiOutlineClose onClick={HandleClose} style={{width:25,height:25,marginRight:0}}/>
            </div>
            </div>
            {
                docs && docs.map(doc => (
                //     <div>
                //     <span style={{color:'black'}}>{doc.userName}:</span>   
                //    <span style={{color:'black'}}>{doc.msg}</span>
                //     {/* <span style={{color:'gray',fontSize:'10px'}}>{moment(doc.createdAt.toDate ( )).fromNow()}</span> */}
                //    </div>
                <div>
                        {/* <div>{doc.userName}, {doc.Recciptant} </div> */}
                        {
                (doc.userName === props.to || doc.Recciptant === props.to) ?

              <div><span style={{color:'black' , fontWeight:'bold'}}>{doc.userName} :</span>   
              <span style={{color:'black'}}>{doc.msg}</span></div>

              :

              <div></div>
            }
                    
                    {/* <span style={{color:'gray',fontSize:'10px'}}>{moment(doc.createdAt.toDate ( )).fromNow()}</span> */}
                   </div>
                ))
            }

        </div>
        <input id='chat-box-input' onChange={ (e)=> {setMsg(e.target.value)}}  type="text"></input>
                <button onClick={ChnageHandler}>Send</button>
        </div>
    )
}
export default Chatbox;