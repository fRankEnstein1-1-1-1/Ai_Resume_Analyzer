import { useState } from "react";
import { useAuth } from "../context/AuthContext"
import { useNavigate,Link } from "react-router-dom";

function Login(){
    const navigate = useNavigate()
    const {login} = useAuth()
    const [form,setform] = useState({
        email:"",
        password:""
    })
    const[loading ,setloading] = useState(false)
    const[error,seterror] = useState("")

    function handleChange(e){
        setform({...form,[e.target.name]: e.target.value })
    }
   async function handleSubmit(e)
    {
      e.preventDefault()
      try{
        seterror("")
        setloading(true)
        await login(form)
        navigate("/dashboard")
      }
      catch(error){
        seterror("Login Failed")
      }
      finally{
        setloading(false)
      }
    }
     return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Login 