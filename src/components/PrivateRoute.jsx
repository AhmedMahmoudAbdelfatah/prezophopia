import { useEffect } from 'react';
import {Outlet, useNavigate} from 'react-router-dom'

const PrivateRoute = () => {
    const isLogedIn = localStorage.getItem("user") ? true : false;
    let navigate = useNavigate();
    useEffect(() => {
        if (!isLogedIn) navigate("/signin", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        isLogedIn ? <Outlet /> : null
    )
}

export default PrivateRoute
