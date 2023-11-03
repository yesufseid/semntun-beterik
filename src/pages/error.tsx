
import { Link } from "react-router-dom"
export default function error() {
  return (
    <div className='h-screen   text-center'>
      <h1 className='font-extrabold text-4xl mt-60'>501</h1>
    <h1 className='font-extrabold text-4xl '>some thing is wrong in the server </h1>
    <h1 className='font-extrabold text-4xl mb-10'>please try again </h1>
    <Link  to={"/"} className="w-56 px-10 py-2 mt-10 bg-slate-700 hover:outline hover:bg-transparent   rounded-full">Back Home</Link>
</div>
  )
}
