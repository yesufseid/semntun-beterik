import Navbar from "../commponents/Navbar"
import { useQuery } from "@tanstack/react-query"
import { useParams } from 'react-router-dom'
import UpdatePost from '../commponents/updatePost'
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import Loading from './loading';
import Error from "./error";

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



  return (
    <div className="bg-white text-black">
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
         <h1 className="my-5 font-semibold text-5xl text-left "
         >{title}</h1>
      {
       img?(<img  className="h-96 w-auto mx-auto " src={img} alt="img" />):(null)
      }
         <p className="text-justify my-5 leading-relaxed font-semibold">
           {content}
            </p>
         </div>
       
       )}
       </div>
     
    </div>
  )
}
