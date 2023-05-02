import React ,{useRef,useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {ChatEngine} from 'react-chat-engine'
import {auth} from '../firebase'
import {useAuth} from '../contexts/AuthContext'
import axios from 'axios'
function Chats() {
   const history=useHistory(); 
   const {user}=useAuth();
   const [loading,setLoading]=useState(true);
   
   const handleLogout=async()=>{
    await auth.signOut();
    history.push('/');
   }
   const getFile=async (url)=>{
    const response=await fetch(url);
    const data=await response.blob();

    return new File([data],"userPhoto.jpg",{type:'image/jpeg'})
   }

   useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    }
  
    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        "project-id": "5437d961-28b5-44af-aa29-d059d1be329a",
        "user-name": user.email,
        "user-secret": user.uid,
      }
    }).then(() => {
      setLoading(false);
    }).catch(() => {
      let formData = new FormData();
      formData.append('email', user.email);
      formData.append('username', user.email);
      formData.append('secret', user.uid);
      getFile(user.photoURL).then((avatar) => {
        formData.append('avatar', avatar, avatar.name);
        axios.post('https://api.chatengine.io/users', formData, {
          headers: {
            "private-key": "229c5dba-b3ae-4c63-aefa-9a423512c1f4"
          }
        }).then(() => {
          setLoading(false);
        }).catch((error) => {
          console.log(error);
        });
      });
    });
  }, [user, history]);
  
   if(!user || loading) return 'Loading...'
  return (
    <div className="chats-page">
        <div className="nav-bar">
            <div className="logo-tab">
               MychatApp
            </div>
            <div onClick={handleLogout}   className="logout-tab">
             Logout
            </div>
        </div>
       
       <ChatEngine 
       height="calc(100vh - 66px)"
       projectID="5437d961-28b5-44af-aa29-d059d1be329a"
       userName={user.email}
       userSecret={user.uid}
       />


    </div>
  )
}

export default Chats
