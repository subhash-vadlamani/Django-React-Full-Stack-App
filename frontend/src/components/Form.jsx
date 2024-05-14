import {useState} from "react"
import api from '../api'
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
import LoadingIndicator from "./LodingIndicator"

function Form({route, method}){
    const [username, setUsername] = useState("")

    const[password, setPassword] = useState("")
    const[loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const fullUrl = `${api.defaults.baseURL}${route}`;

        try {

            console.log("Sending request to URL:", fullUrl); // Log the full URL
            console.log("API config:", api); // This will log the entire Axios instance configuration

            const res = await api.post(route, {username, password})
            console.log(res)
            if (method === 'login'){
                console.log("The access token is as follows: " + res.data.access)
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            }
            else{
                navigate('/login')
            }
            
        } catch (error) {
            alert(error)
            
        } finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input" 
            type="text"
            value= {username}
            onChange= {(e) => setUsername(e.target.value)}
            placeholder = "Username"

        />

        <input
            className="form-input" 
            type="password"
            value= {password}
            onChange= {(e) => setPassword(e.target.value)}
            placeholder = "Password"

        />
        {loading && <LoadingIndicator />}

        <button className="form-button" type="submit">
            {name}
        </button>
    </form>

}

export default Form