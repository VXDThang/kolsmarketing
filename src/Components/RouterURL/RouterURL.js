
import Register_KOL from '../KOL/Register_KOL/Register';
import Login_KOL from '../Login/Login';
import ForgetPassword_KOL from '../Login/ForgetPassword';
import ForgetPassword_KOL_SendOTP from '../Login/ForgetPasswordSendOTP'
import Renew_Password_KOL from '../Login/RenewPassword';

import ForgetPassword_Brand from '../Brand/Forget_Password_Brand/ForgetPassword';
import ForgetPassword_Brand_SendOTP from '../Brand/Forget_Password_Brand/ForgetPasswordSendOTP';
import Renew_Password_Brand from '../Brand/Forget_Password_Brand/RenewPassword';

import Homepage_KOL from '../KOL/Homepage_KOL/Homepage';
import Read_One from '../KOL/Read_One/Read_One';
import List_Brand from '../KOL/Top_Brand/Brand'
import Save_Brand from '../KOL/Top_Brand/Save_Brand_Page'
import Save_Opportunity from '../KOL/Save_Opportunity/Save_Opportunity'
import Have_Opportunity from '../KOL/Have_Opportunity/Have_Opportunity'
import StalkBrand from '../KOL/Stalk_Brand/StalkBrand'
import SettingKOL from '../KOL/Setting_KOL/Setting'
import JobKOL from '../KOL/Job_KOL/Job_KOL'
import Read_Noti from '../KOL/Read_Notification/Read_Notification'
import See_More_Post_For_You from '../KOL/See_More_Post/See_More_Post_For_You'
import See_More_Post_Interesting from '../KOL/See_More_Post/See_More_Post_Interesting'
import Search_Job_KOL from '../KOL/Search_Job_KOL/Search_Job_KOL'
import Invite_Job from '../KOL/Invite_Job/Invite_Job'

import Register_Brand from '../Brand/Register_Brand/Register';
import Login_Brand from '../Brand/Login_Brand/Login';
import Header_Brand_Login from '../Brand/Header/Header_Brand_ForLogin/Header';
import Header_Brand_User from '../Brand/Header/Header_Brand_User/Header';
//admins
import Admin_Login from '../Admin/Admin_Login';
import Admin from '../Admin/Admin';

//mess
import Message from '../Message/ChatRoom'

//logout
import LogOut from '../KOL/LogOut/LogOut'

//test
import Test from '../Test/Test';

//.. Mobile ..
import Register_KOL_MB from '../KOL_Mobile/Register_KOL/Register';
import Login_KOL_MB from '../KOL_Mobile/Login_KOL_MB/Login';
import ForgetPassword_KOL_MB from '../KOL_Mobile/Login_KOL_MB/ForgetPassword';
import ForgetPassword_KOL_SendOTP_MB from '../KOL_Mobile/Login_KOL_MB/ForgetPasswordSendOTP'
import Renew_Password_KOL_MB from '../KOL_Mobile/Login_KOL_MB/RenewPassword';

import Homepage_KOL_MB from '../KOL_Mobile/Homepage_KOL_MB/Homepage_KOL_MB';

import Read_One_MB from '../KOL_Mobile/Read_One_MB/Read_One';
import Save_Opportunity_MB from '../KOL_Mobile/Save_Opportunity_MB/Save_Opportunity'
import Have_Opportunity_MB from '../KOL_Mobile/Have_Opportunity_MB/Have_Opportunity'

import List_Brand_MB from '../KOL_Mobile/Top_Brand_MB/Brand'
import Save_Brand_MB from '../KOL_Mobile/Top_Brand_MB/Save_Brand_Page'

import StalkBrand_MB from '../KOL_Mobile/Stalk_Brand_MB/StalkBrand'

import See_More_Post_For_You_MB from '../KOL_Mobile/See_More_Post_MB/See_More_Post_For_You'

import Search_Job_KOL_MB from '../KOL_Mobile/Search_Job_KOL_MB/Search_Job_KOL'

import SettingKOL_MB from '../KOL_Mobile/Setting_KOL_MB/Setting'

import Message_MB from '../Message_Mobile/ChatRoom'
//.. Mobile ..

import React from 'react'
import {
  Routes,
  Route
} from "react-router-dom";


export default function RouterURL({ socket, setIsLogined, navigate }) {
  const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return { width };
  };

  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;
  return (
    <Routes>
      <Route path='/test' element={<Test />} />
      <Route path='/admins-login' element={<Admin_Login setIsLogined={setIsLogined} navigate={navigate} />} />
      <Route path='/admins' element={<Admin setIsLogined={setIsLogined} navigate={navigate} />} />

      <Route path='/' element={isMobile ? <Homepage_KOL_MB /> : <Homepage_KOL />} />

      <Route path='/kols-login'
        element=
        {isMobile ? <Login_KOL_MB socket={socket} setIsLogined={setIsLogined} navigate={navigate} />
          :
          <Login_KOL socket={socket} setIsLogined={setIsLogined} navigate={navigate} />} />

      <Route path='/kols-register'
        element=
        {isMobile ? <Register_KOL_MB socket={socket} setIsLogined={setIsLogined} navigate={navigate} />
          :
          <Register_KOL socket={socket} setIsLogined={setIsLogined} navigate={navigate} />} />

      <Route path='/kols-forget-password'
        element={isMobile ? <ForgetPassword_KOL_MB /> : <ForgetPassword_KOL />} />

      <Route path='/kols-forget-password/send-otp'
        element={isMobile ? <ForgetPassword_KOL_SendOTP_MB /> : <ForgetPassword_KOL_SendOTP />} />

      <Route path='/kols-renew-password'
        element={isMobile ? <Renew_Password_KOL_MB /> : <Renew_Password_KOL />} />

      <Route path='/read-one/:id'
        element={isMobile ? <Read_One_MB /> : <Read_One />} />

      <Route path='/list-brand'
        element={isMobile ? <List_Brand_MB /> : <List_Brand />} />

      <Route path='/save-brand'
        element={isMobile ? <Save_Brand_MB /> : <Save_Brand />} />

      <Route path='/save-opportunity'
        element={isMobile ? <Save_Opportunity_MB /> : <Save_Opportunity />} />

      <Route path='/have-opportunity'
        element={isMobile ? <Have_Opportunity_MB /> : <Have_Opportunity />} />

      <Route path='/see-more-post-for-you'
        element={isMobile ? <See_More_Post_For_You_MB /> : <See_More_Post_For_You />} />

      <Route path='/see-more-post-interesting' element={<See_More_Post_Interesting />} />

      <Route path='/stalkbrand/:id'
        element={isMobile ? <StalkBrand_MB /> : <StalkBrand />} />

      <Route path='/setting'
        element={isMobile ? <SettingKOL_MB /> : <SettingKOL />} />

      <Route path='/kols-job' element={<JobKOL />} />

      <Route path='/read-noti/:id_job/:id_job_describe' element={<Read_Noti />} />

      <Route path='/search/:id_cate/:id_province/:mess_cate/:mess_address'
        element={isMobile ? <Search_Job_KOL_MB /> : <Search_Job_KOL />} />

      <Route path='/invitejob/:id_post/:linkcode' element={<Invite_Job />} />

      <Route path='/testMobile' element={<Homepage_KOL_MB />} />

      <Route path='/logout' element={<LogOut socket={socket} />} />

      <Route path='/brand' element={<Header_Brand_Login />} />
      <Route path='/brand-login' element={<Login_Brand socket={socket} setIsLogined={setIsLogined} navigate={navigate} />} />
      <Route path='/brand-register' element={<Register_Brand socket={socket} setIsLogined={setIsLogined} navigate={navigate} />} />
      <Route path='/brands-forget-password' element={<ForgetPassword_Brand />} />
      <Route path='/brands-forget-password/send-otp' element={<ForgetPassword_Brand_SendOTP />} />
      <Route path='/brands-renew-password' element={<Renew_Password_Brand />} />

      <Route path='/brand-user' element={<Header_Brand_User />} />
      {/* <Route path='/brand-job' element={<Job_Brand />} /> */}

      <Route path='/message/:id_room/:id_user/:user_role'
        element={isMobile ?
          <Message_MB socket={socket} setIsLogined={setIsLogined} navigate={navigate} />
          :
          <Message socket={socket} setIsLogined={setIsLogined} navigate={navigate} />} />

    </Routes>
  )
}