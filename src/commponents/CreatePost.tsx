import { useState } from "react"
import Navbar from "./Navbar"
import { Link,} from "react-router-dom"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Progress from "./progress";


export default function CreatePost() {
  const session=window.localStorage
  const accessToken=session.accessToken
    const [title,setTitle]=useState("")
    const [image,setimage]=useState<any>("")
    const [text,setText]=useState("")
    const [id,setId]=useState()
    const [isLoading,setLoading]=useState(false)
const fileUplode=async(e)=>{
    const file=e.target.files[0]
    const Base64= await ConvertToBase64(file)
    return setimage(Base64)
}


const handleCopy=(text)=>{
  const content=text.slice(0,500)
   navigator.clipboard.writeText(content +"   see more ...   "+"https://semntun-beterik.onrender.com/allpost/"+id)
}




const data={
  title:title,
  content:text,
  img:image,
}
const options = {
  method: 'POST',
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
  if(!res.ok) return console.log("error");
  
  if(res.ok){
    const post=await res.json()
   return  setId(post.id)
  }
 



}

// async function postData( ) {
//   axios({
//     method: 'post',
//     url: 'http://localhost:3000/api',
//     data: {
//        title:title,
//        img:image,
//        content:text
//   }})
//      .then(res=> Navigeter(""))
//      .catch(er=>console.log(er)
//      )
//   }

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className=" mx-5 md:mx-20">
      <div className="mt-5">
        <label htmlFor="" className="my-5 text-2xl">Title</label> <br />
        <input type="text"  className=" border-2 border-sky-500 rounded-lg w-80 md:w-96 h-10 my-5" onChange={(e)=>setTitle(e.target.value)} />
      </div>
      <div className="mt">
        <label htmlFor="file"><CloudUploadIcon />  Upload Image</label>
        <input type="file"  id="file" className="mt- invisible " onChange={e=>fileUplode(e)}   />
      </div>
       <div>
        <h1 className="text-2xl mb-3 mt-3"> Content</h1>
        <textarea name="content" className="border-2 border-sky-500 rounded-lg w-80 md:w-full h-52 md:h-60" onChange={e=>setText(e.target.value)}> </textarea>
       </div>
        <div className="md:flex md:items-center">
       <button className="flex w-32 py-2 mt-5 bg-slate-700 hover:outline hover:bg-transparent justify-center  rounded-full align-middle" onClick={()=>postData()}>{isLoading?(<Progress />):(<h1>Post</h1>)}</button>
      {id?(<div className="md:flex mx-3 items-center ">
        <Link  className="text-blue-600 mt-3 mr-5 " to={`/allpost/${id}`}>https://semntun-beterik.onrender.com/allpost/{id}
      </Link> <ContentCopyIcon  onClick={()=>handleCopy(text)} className=' cursor-pointer transition ease-in-out delay-150
           hover:-translate-y-1 hover:scale-110 hover:border-sky-600 duration-300  shadow-xl'/></div> ):null}
      </div>
       </div>
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
