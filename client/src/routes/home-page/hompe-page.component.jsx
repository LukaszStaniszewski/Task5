import { useState } from "react"
import { useNavigate } from "react-router-dom"

import * as api from "../../api/axios-Instance.api"
import { useUserContext } from "../../context/user.context"

const HomePage = () => {
const [name, setName] = useState({username: ''})
const {setUser, setLoading, isLoading} = useUserContext()
const navigate = useNavigate()

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    setLoading(true)
    localStorage.removeItem("token")
    const response = await api.createUser(name)
    localStorage.setItem("token", JSON.stringify(response.data.authenticationToken))
    setUser(response.data.user)
    setLoading(false)
    navigate("/message")
  } catch (error) {
    setLoading(false)
    console.error(error)
  }
}

const handleChange = (event) => {
 const {name, value} = event.target
 setName((prevState) => ({...prevState, [name]: value}))
}

  return (
    <section className="w-full h-full flex flex-col justify-center items-center">
      <form className="flex items-center border-b border-teal-500 py-2" onSubmit={handleSubmit}>
        <input id="name-input" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        placeholder="your name"
        type="text"
        name="username"
        value={name.username}
        onChange={handleChange}
        required
        />
        <button className={`btn ${isLoading && "loading" }  bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded`}>Submit</button>
      </form>
    </section>
  )
}

export default HomePage
