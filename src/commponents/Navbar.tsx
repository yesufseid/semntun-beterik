
import logo from "../assets/avatar-1001305737882.jpg"
import { NavLink } from "react-router-dom";


export default function Navbar() {
  const session=window.localStorage
  const accessToken=session.accessToken



  return (
    <div className="flex md:px-10  py-2 bg-slate-400 font-serif items-center">
      <div>
        {accessToken?( <NavLink
           to="/"
           className={({ isActive, isPending }) =>
             isPending ? "pending" : isActive ? "active" : ""
           }
         >
          <img src={logo} alt="Logo" className="ml-5  w-16 h-16 rounded-full " />
         </NavLink>):( <img src={logo} alt="Logo" className="ml-5  w-16 h-16 rounded-full" />)}
      </div>
        {accessToken?(
          <div className="md:ml-auto ml-10 grid grid-cols-3 md:gap-5 gap-3 md:mr-10 ">
              <NavLink
           to="/"
           className={({ isActive, isPending }) =>
             isPending ? "pending" : isActive ? "active" : ""
           }
         >
           Home
         </NavLink>
         <NavLink
           to="/allpost"
           className={({ isActive, isPending }) =>
             isPending ? "pending" : isActive ? "active" : ""
           }
         >
           All Posts
         </NavLink>
         <NavLink
           to="/register"
           className={({ isActive, isPending }) =>
             isPending ? "pending" : isActive ? "active" : ""
           }
         >
           register
         </NavLink>
          </div>
          
        ):(<p  className="ml-auto mr-10 font-sans text-2xl">ሳምንቱን በታሪክ</p>)}
       
   </div>
  )
}
