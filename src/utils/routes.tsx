
import {Route,createBrowserRouter,createRoutesFromElements} from "react-router-dom"
import Home from "../pages/Home"
import Post from "../pages/Post"
import Login from "../pages/login";
import Allpost from "../pages/allpost"
import NotFound from "../pages/notFound";
import Register from "../pages/register"



const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/allpost" element={<Allpost/>} />
        <Route path="/allpost/:id" element={<Post/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    )
  );

export default router