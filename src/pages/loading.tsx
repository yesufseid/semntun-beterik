
import CircularProgress from '@mui/material/CircularProgress';





export default function loading() {
  return (
     <div className="h-screen flex items-center">
      <div className="h-36 w-36 mx-auto shadow-black">
      <CircularProgress disableShrink />
      </div>
     </div>
  );
}

