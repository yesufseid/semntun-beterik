
import { useState } from "react"
import { Link,} from "react-router-dom"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Progress from "./progress";
import Error from "../pages/error";


export default function Home({ids,titles,img,content}) {
  const session=window.localStorage
  const accessToken=session.accessToken
    const [title,setTitle]=useState(titles)
    const [image,setimage]=useState(img)
    const [text,setText]=useState(content)
    const [id,setId]=useState()
    const [isLoading,setLoading]=useState(false)



    const handleCopy=()=>{
      navigator.clipboard.writeText("https://semntun-beterik-api.onrender.com/allpost/"+id)
   }

const fileUplode=async(e)=>{
    const file=e.target.files[0]
    const Base64= await ConvertToBase64(file)
    return setimage(Base64)
}
  
const data={
  title:title,
  content:text,
  img:image,
  id:ids
}
const options = {
  method:'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization':accessToken
  },
  body: JSON.stringify(data)
}; 
const postData=async()=>{
  setLoading(true)
  
  const res=await fetch("https://semntun-beterik-api.onrender.com/api",options)
  setLoading(false)
  if(!res.ok) return <Error />
  
  if(res.ok){
    const post=await res.json()
      
    return setId(post.id)
  }
 



}




  return (
    <div>
      <div className="px-5 text-center">
          
      <input type="text" className="my-5 font-semibold text-5xl text-center focus:border-green-600  md:w-full w-80 " defaultValue={title}  onChange={(e)=>setTitle(e.target.value)}
       />
   {
     <div>
     <label htmlFor="file">{image?(<img  className="h-96 w-auto mx-auto " src={image} alt="img" />):(null)}</label>
     <input type="file"  id="file" className="my-5 invisible " onChange={e=>fileUplode(e)}   />
   </div>
   }
      <textarea className="text-justify my-5 leading-relaxed font-semibold w-80  md:w-full  h-screen md:h-96"  defaultValue={text} onChange={e=>setText(e.target.value)}/>
      </div >
      
       <button className="flex w-32 py-2 mt-5 bg-slate-700 hover:outline hover:bg-transparent justify-center  rounded-full align-middle" onClick={()=>postData()}>{isLoading?(<Progress />):(<h1>save changs</h1>)}</button>
      {id?(<div className="md:flex mx-3 md:items-center ">
        <Link  className="text-blue-600 mt-3 mr-5" to={`/allpost/${id}`}>http://localhost:5173/allpost/{id}
      </Link> <ContentCopyIcon  onClick={handleCopy} className=' cursor-pointer transition ease-in-out delay-150
           hover:-translate-y-1 hover:scale-110 hover:border-sky-600 duration-300  shadow-xl'/></div> ):null}
      </div>
  )
}

function ConvertToBase64(file){
  return new Promise((resolve, reject) => {
     const fileReader=new FileReader()
     fileReader.readAsDataURL(file)
     fileReader.onload=()=>{
      resolve(fileReader.result)
     }
     fileReader.onerror=(error)=>{
      reject(error)
     }
  })
}
