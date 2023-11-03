import CreatePost from '../commponents/CreatePost'

import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  // const [open,setOpen]=useState(false)
const Naviagte=useNavigate()
const session=window.localStorage


useEffect(()=>{
  const now = new Date()
  if (!session) {
		return null
	}
  if(session.length===0)  Naviagte("/login")
  if (now.getTime() >  Number(session.expiry)) {
		localStorage.clear()
		return null
	}
})   
  



  return (
    <div className='bg-white h-screen'>
      <div>
      <CreatePost  />
      </div>
      
        {/* {open?(<Login />):null} */}
    </div>
  )
}
