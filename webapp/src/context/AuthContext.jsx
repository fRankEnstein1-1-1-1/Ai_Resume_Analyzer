import { useState , createContext , useContext } from "react";
import API from "../api/axios.js";
const AuthContext = createContext()

function AuthProvider({children}){
    const [user,setuser] = useState(null);

    //login context
    async function login(data){
        const res = await API.post("/auth/login",data)
        localStorage.setItem("token",res.data.token)
        setuser(res.data.user)

    }
    //sign in context
async function register(data){
  await API.post("/auth/register", data)

  const res = await API.post("/auth/login", {
    email: data.email,
    password: data.password
  })

  localStorage.setItem("token", res.data.token)
  setuser(res.data.user)
}


    //logout context

    async function logout(){
        localStorage.removeItem("token")
        setuser(null)
    }
    return <>
     <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
    </>
}
export default AuthProvider


export const useAuth = ()=>useContext(AuthContext)