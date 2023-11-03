// import axios from "axios";



 export const getPost =async () => {
   
  const res=await fetch("semntun-beterik-api.vercel.app/api/post/4",{
    method:"GET"
  })
  const post=res.json()
  return post
}





export const getallPost =async () => {
  const session=window.localStorage
  const accessToken=session.accessToken
   
  const res=await fetch("https://semntun-beterik-api.onrender.com/api",{
     method:"GET",
     headers: {
      'Content-Type': 'application/json',
      'Authorization':accessToken
    },
   })
   const post=res.json()
   return post
 }
 
 export const DeletePost =async (id) => {
  const session=window.localStorage
  const accessToken=session.accessToken
   
  const res=await fetch("https://semntun-beterik-api.onrender.com/api/post/"+id,{
     method:"DELETE",
     headers: {
      'Content-Type': 'application/json',
      'Authorization':accessToken
    },
   })
   const post=res.json()
   return post
 }
