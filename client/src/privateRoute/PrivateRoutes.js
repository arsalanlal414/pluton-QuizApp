import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const accessToken = localStorage.getItem('accessToken')
    const adminAccessToken = localStorage.getItem('adminAccessToken')
    return (
      accessToken || adminAccessToken ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes;