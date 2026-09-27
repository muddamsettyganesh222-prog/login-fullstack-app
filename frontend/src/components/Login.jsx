import { useState } from 'react'
import axios from 'axios'
function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
        const response = await axios.post(
            'http://localhost:5000/api/login',
            {
                email: email,
                password: password
            }
        )

        console.log(response.data)

        setMessage(response.data.message)

    } catch (error) {
        console.log(error.response.data)

        setMessage(error.response.data.message)
    }
}

  return (
    <div>
      <h2>Login Page</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <br />

        <button type="submit">
          Login
        </button>

      </form>
      <p>{message}</p>
    </div>
  )
}

export default Login