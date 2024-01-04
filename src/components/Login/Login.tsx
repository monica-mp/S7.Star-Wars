import { type FormEvent, useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useElements } from '../../Context'

function Login (): JSX.Element {
  // States
  const navigate = useNavigate()
  const { setIsLoggedIn, setIsUserLoggedIn } = useElements()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string>('')

  // Async function to handle form submit
  async function handleSubmit (e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    try {
      // Sending a POST request to the server with form data
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      // Checking if the response is successful
      if (response.ok) {
        // If successful, update the state and navigate to the app page
        const data = await response.json()
        console.log(data.user)
        setIsLoggedIn(true)
        setIsUserLoggedIn(true)
        navigate('/app')
      } else {
        // If unsuccessful, get the error message from the server
        const errorMessage = await response.text()
        setError(errorMessage)
      }
    } catch (error) {
      // Log any unexpected errors to the console
      console.error(error)
    }
  }

  // Function to handle input changes and update form data
  function handleChange (e: ChangeEvent<HTMLInputElement>): void {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='font-mono h-screen flex flex-col justify-center items-center'>

      <div className='w-96 rounded-2xl py-8 px-4 bg-neutral-950'>
        <div className='flex justify-between text-xl text-white font-mono pl-2 self-center pb-2'>
          <h1 className='text-3xl self-center'>LOG IN</h1>
          <Link to="/">
            <button className="btn btn-ghost btn-circle self-start text-xl">X</button>
          </Link>
        </div>
        <form className='flex flex-col gap-4' onSubmit={e => { void handleSubmit(e) }}>
          <input type='text' className='input input-bordered border-gray-300 rounded-full' placeholder='Email' value={formData.email} name='email' onChange={e => { handleChange(e) }} ></input>
          <input type='password' className='input input-bordered border-gray-300 rounded-full' placeholder='Password' value={formData.password} name='password' onChange={e => { handleChange(e) }} ></input>
          {(error.length > 0) && <p className='text-red-600'>{error}</p>}
          <div className='flex flex-col gap-4 mt-4'>
            <button className='btn btn-info w-24  rounded-full mx-auto' type='submit'>LOGIN</button>
            <div className="flex items-center ">
              <div className="border h-0 w-2/4 border-stone-300"></div>
              <div className="text-stone-300 px-4 text-sm font-normal">OR</div>
              <div className="border h-0 w-2/4 border-stone-300"></div>
            </div>
            <div className='mx-auto'><Link to="/signup"><button className='btn btn-outline w-24 rounded-full' type='button'>SIGN UP</button></Link></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
