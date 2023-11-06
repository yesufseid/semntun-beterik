import Navbar from "../commponents/Navbar"
import { useQuery } from "@tanstack/react-query"
import { useParams } from 'react-router-dom'
import UpdatePost from '../commponents/updatePost'
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import Loading from './loading';
import Error from "./error";
import { Link,} from "react-router-dom"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Home() {
  const session=window.localStorage
  const accessToken=session.accessToken
  const [edit ,setEdit]=useState(false)
  const {id} = useParams()
const getPost=async()=>{
  const res=await fetch("https://semntun-beterik-api.onrender.com/api/post/"+id,{
    method:"GET"
  })
  const post=res.json()
  return post

}
 const postQuery=useQuery({
    queryKey:["posts"],
    queryFn:getPost
  })
   
  if(postQuery.isLoading) return <Loading />
  if(postQuery.isError) return <Error />
const{title,content,img}=postQuery.data


const handleCopy=(text)=>{
  const conten=text.slice(0,500)
  navigator.clipboard.writeText(conten + "    see more...       " + "https://semntun-beterik-api.onrender.com/allpost/"+id)
}

  return (
    <div className="bg-white text-black  h-screen ">
      <Navbar />
      {accessToken?( <h1  onClick={()=>setEdit((prev)=>!prev)} className="text-end w-10 ml-auto my-5 mr-5">
       <EditIcon  className='cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 
       hover:scale-110 hover:border-sky-600 duration-300  shadow-xl' />
       </h1>):
        null
       }
       <div>
        {edit?(<UpdatePost ids={id} titles={title}  img={img}  content={content}/>):(

       
         <div className="px-5 text-center">
         <h1 className="my-5 font-semibold md:text-5xl text-xl text-left "
         >{title}</h1>
      {
       img?(<img  className="h-96 w-auto mx-auto " src={img} alt="img" />):(null)      }
         <pre className="text-justify  indent-8  my-5  tracking-tight leading-4  overflow-scroll" >
           {content}
            </pre>
         </div>
       
       )}
       </div>
      {accessToken?(
       <div className="md:flex mx-3 md:items-center ">
        <Link  className="text-blue-600 mt-3 mr-5" to={`/allpost/${id}`}>https://semntun-beterik.onrender.com/allpost/{id}
      </Link> <ContentCopyIcon  onClick={()=>handleCopy(content)} className=' cursor-pointer transition ease-in-out delay-150
           hover:-translate-y-1 hover:scale-110 hover:border-sky-600 duration-300  shadow-xl'/></div>):null}
    </div>
  )
}
