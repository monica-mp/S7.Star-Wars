import { type FormEvent, type ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

function Signup (): JSX.Element {
  // States
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Handle form submit
  function handleSubmit (e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    // Sending a POST request to the server with form data
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(async (res) => {
        if (res.ok) {
          return await res.json()
        } else {
          const errorData = await res.json()
          throw new Error(errorData.message)
        }
      })
      .then((data) => {
        console.log(data)
        setError(null)
      })
      .catch((error) => {
        console.error(error)
        setError('Email already registered')
      })
  }

  // Handle input changes and update form data
  function handleChange (e: ChangeEvent<HTMLInputElement>): void {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='font-mono h-screen flex flex-col justify-center items-center'>
      <div className='w-96 rounded-2xl py-8 px-4 bg-neutral-950'>
        <div className='flex justify-between text-xl text-white font-mono pl-2 self-center pb-2'>
          <h1 className='text-3xl self-center'>SIGN UP</h1>
          <Link to="/">
            <button className="btn btn-ghost btn-circle self-start text-xl">X</button>
          </Link>
        </div>
        <form className='flex flex-col gap-4' onSubmit={e => { handleSubmit(e) }}>
          <input type='text' className='input input-bordered border-gray-300 rounded-full' placeholder='Email' value={formData.email} name='email' onChange={e => { handleChange(e) }} ></input>
          {(error != null) && <p className="text-red-600">{error}</p>}
          <input type='password' className='input input-bordered border-gray-300 rounded-full' placeholder='Password' value={formData.password} name='password' onChange={e => { handleChange(e) }} ></input>
          <div className='flex flex-col gap-4 mt-4'>
            <button className='btn btn-info w-24  rounded-full mx-auto' type='submit'>SIGNUP</button>
            <div className="flex items-center ">
              <div className="border h-0 w-2/4 border-stone-300"></div>
              <div className="text-stone-300 px-4 text-sm font-normal">OR</div>
              <div className="border h-0 w-2/4 border-stone-300"></div>
            </div>
            <div className='mx-auto'><Link to="/login"><button className='btn btn-outline w-24 rounded-full' type='button'>LOGIN</button></Link></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
