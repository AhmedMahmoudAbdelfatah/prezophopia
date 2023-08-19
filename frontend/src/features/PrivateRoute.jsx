import { useContext } from 'react';
import {Outlet, Navigate} from 'react-router-dom'
import { UserContext } from './UserContext';

const PrivateRoute = () => {
    const { user } = useContext(UserContext);
  
    return (
        user.accessToken ? <Outlet /> : <Navigate to='/signin' replace={ true } />
    )
}

export default PrivateRoute
