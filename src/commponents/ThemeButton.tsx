import { Button } from "@mui/material"
import { useState,useEffect } from "react"



export default function ThemeButton() {
  const [theme,setTheme]=useState(null)
//   useEffect(()=>{
//         if(window.matchMedia('(prefers-color-scheme:dark)').matches){
//             setTheme('dark')
//         }else{
//             setTheme('light')
//         }
//   },[])
// useEffect(()=>{
//     if(theme==="dark"){
//         document.documentElement.classList.add('dark')
//     }else{
//         document.documentElement.classList.remove('dark')
//     }
// },[theme])

// const handleThemeSwitch=()=>{
//     setTheme(theme==="dark"?"light":"dark")
// }




//   return (
//        <button onClick={handleThemeSwitch}>click me</button>
//   )
}
