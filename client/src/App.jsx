import  { Toaster } from "react-hot-toast";
import "./App.css";
import { useDispatch, } from "react-redux";
import { useEffect } from "react";
import { getProfileThunk} from "./store/slice/user/userThunk";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    (async ()=>{
      await dispatch(getProfileThunk());
    })()
  },[])

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
