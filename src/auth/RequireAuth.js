import React from 'react';
import { useLocation,Navigate,Outlet } from "react-router-dom"
import {useSelector} from 'react-redux'
import swal from 'sweetalert2';
import BackdropLoader from '../app/components/common/BackdropLoader';
const RequireAuth = (allowedRoles) => {
    const location =useLocation();
    const {login,loading,isAuthenticated}=useSelector(state=>state.login);
    if(login?.role!==undefined&&!allowedRoles.allowedRoles?.includes(login?.role))
    swal.fire({  
      title: 'Unauthorized Access',  
      type: 'error',  
      text: 'UnAuthorized access detected',  
      background:'pink',
      timer:3000
  }); 
    return(
      loading==true?<BackdropLoader/>:(loading==false&&allowedRoles.allowedRoles?.includes(login?.role)
            ? <Outlet/>:loading==false&&!isAuthenticated?<Navigate to="/login" state = {{from: location}} replace/>:<></>)
    ) 
}
export default RequireAuth; 