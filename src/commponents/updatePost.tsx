
import { useState } from "react"
import Progress from "./progress";
import Error from "../pages/error";


export default function Home({ids,titles,img,content}) {
  const session=window.localStorage
  const accessToken=session.accessToken
    const [title,setTitle]=useState(titles)
    const [image,setimage]=useState(img)
    const [text,setText]=useState(content)
    const [isLoading,setLoading]=useState(false)




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
    return console.log(post.id)
  }
 



}




  return (
    <div>
      <div className="px-5 text-center">
          
      <input type="text" className="my-5 font-semibold md:text-5xl   text-xl  text-center focus:border-green-600  md:w-full w-80 " defaultValue={title}  onChange={(e)=>setTitle(e.target.value)}
       />
   {
     <div>
     <label htmlFor="file">{image?(<img  className="h-96 w-auto mx-auto " src={image} alt="img" />):(null)}</label>
     <input type="file"  id="file" className="my-5 invisible " onChange={e=>fileUplode(e)}   />
   </div>
   }
      <textarea className="text-justify my-5 leading-relaxed font-semibold w-80  md:w-full  h-screen"  defaultValue={text} onChange={e=>setText(e.target.value)}/>
      </div >
      
       <button className="flex w-32 py-2 mt-5 bg-slate-700 hover:outline hover:bg-transparent justify-center  rounded-full align-middle" onClick={()=>postData()}>{isLoading?(<Progress />):(<h1>save changs</h1>)}</button>
     
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
