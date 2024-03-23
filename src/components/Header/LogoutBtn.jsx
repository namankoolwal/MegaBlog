import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const handelLogout =() =>{
        setLoading(true)
        authService.logout()
        .then(()=>{
            setLoading(false)
            dispatch(logout())
            localStorage.removeItem("user")
            navigate("/login")
        })
        .catch((error)=>{
            setLoading(false)
            console.log("LogoutBtn :: handelLogout :: error", error)
        })
    }
  return (
    <>
    <Button
          type="button"
          className={`hidden md:inline rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ${loading ? "bg-black/50" :"hover:bg-black/80"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition duration-150 hover:scale-[1.01]`}
            onClick={handelLogout}
        >
          Log Out
        </Button>
        <Button
          type="button"
          className={`md:hidden rounded-full bg-black px-1 text-sm font-semibold text-white shadow-sm ${loading ? "bg-black/50" :"hover:bg-black/80"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition duration-150 hover:scale-[1.01]`}
            onClick={handelLogout}
        >
           &#8594;
        </Button>
        </>
  )
}

export default LogoutBtn