import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sign()
{
    const [form,setform] = useState({
        email:"",
        name:"",
        password:""
    })
    const navigate = useNavigate()
    const {register} = useAuth()
    const [loading,setloading] = useState(false)
    const [error,seterror] = useState("")

    function handleChange(e){
        setform({...form , [e.target.name]:e.target.value})
    }

     async function handleSubmit(e){
        e.preventDefault()
        try{
            setloading(true)
            seterror("")
            await register(form)
            console.log("reached here")
            navigate("/dashboard")
        }
         catch(err){
             seterror("Sign up Failed")
             console.log(err)
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
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

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
          type="string"
          name="name"
          placeholder="Name"
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
          {loading ? "Signing  in..." : "Sign In"}
        </button>

        <p className="text-sm text-center">
           Have an account?{" "}
          <Link to="/login" className="text-blue-600">
           Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Sign