import { useState } from "react";
import makeSession from "../utils/useSession"; 
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Progress from "../commponents/progress";
const ariaLabel = { 'aria-label': 'description' };
import {useNavigate } from "react-router-dom";

export default function login() {
  const Navigate=useNavigate()
  const [loding,setLoading]=useState(false)
  const [showPassword, setShowPassword] =useState(false)
  const [email,setEmail]=useState("")
  const [pasword,setPassword]=useState("")
  const [error,setError]=useState(false)
  const [validat,setValidat]=useState(false)
    const data={
        email:email,
        password:pasword
    }
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }; 
 const getUser =async ()=>{
 if(email.length===0&&pasword.length===0) return  setValidat(true)
setLoading(true)
const res=await fetch("https://semntun-beterik-api.onrender.com/api/login",options)
setLoading(false)
   if(res.status===500) return setError(true)
   if(res.ok){
      const user=await res.json()
      const data={
        id:user.user.id,
        email:user.user.email,
        accessToken:user.accessToken
      }
    makeSession(data)
    return Navigate("/")   
    }
 
} 


const handleClickShowPassword = () => setShowPassword((show) => !show);

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};
  return (
    <div className=" md:absolute md:top-24 md:left-1/3" >
    <div className="flex justify-center md:w-96 md:h-96  h-screen  first-line:px-20 bg-slate-500  rounded-md shadow-2xl transition ease-out  hover:-translate-y-1 hover:scale-110 duration-300">
      <div className="my-auto">
      <div className="pb-2 ml-1">
      <label htmlFor=""className="py-2" >Email</label><br />
        <Input  inputProps={ariaLabel}  onChange={(e)=>setEmail(e.target.value)} /><br />
      </div>
       
       <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" className="ml-0">
          <InputLabel htmlFor="standard-adornment-password" >Password</InputLabel>
          <Input
          onChange={(e)=>setPassword(e.target.value)}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          
        </FormControl><br />
        <div>
        {error&&(<p className="text-red-600">wrong password</p>)}
          {validat&&(<p className="text-red-600">all fildes are requred</p>)}
          <button onClick={()=>getUser()} className="flex w-32 py-2 my-5 mx-auto bg-slate-200 hover:outline hover:bg-transparent justify-center
           rounded-full align-middle">{loding?(<Progress />):(<h1>SignIn</h1>)}</button>
        </div>
        </div> 
    </div>
    </div>
  )
}
