import axios from "axios";
const api = axios.create({
    baseURL: "https://dummyapi.vercel.app/",
    // headers: {
    //   "key": "7873ba98b6d8214e668193edfe0180db"
    // }
  })

  export default api