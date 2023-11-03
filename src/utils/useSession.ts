interface sessionProps{
    id:string
    email:string
    accessToken:string
}



const makeSession=({id,email,accessToken}:sessionProps)=>{
    const now = new Date()

 const time=String(now.getTime()+1000*60*24*30)
    const Session=window.localStorage
    Session.setItem("id",id)
    Session.setItem("email",email)
    Session.setItem("accessToken",accessToken)
    Session.setItem("expiry",time)
    
}


export default makeSession