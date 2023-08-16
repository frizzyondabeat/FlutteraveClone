import { useRef, useState, useEffect } from 'react'
import usePasswordToggle from '../../components/usePasswordToggle'
import { Footer, Navbar } from "../../components"
import { useNavigate, Link } from "react-router-dom" 
import "./Login.css"

const Login = () => {

  const emailRef = useRef()
  const errRef = useRef()

  const [email, setEmail ] = useState("")
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [password, setPassword] = useState("")
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)
  
  const [passwordInputType, toggleIcon] = usePasswordToggle()

  const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,24}$/

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    const isValidEmail = EMAIL_REGEX.test(email)
    console.log(`Valid email: ${isValidEmail}`)
    console.log(`Email: ${email}`)
    setValidEmail(isValidEmail)
  }, [email])

  useEffect(() => {
    const isPwdValid = PWD_REGEX.test(password)
    console.log(`Valid password: ${isPwdValid}`)
    setValidPwd(isPwdValid)
  })

  return (
    <div>
      <Navbar />
      <div className='flex p-20'>
        <div className='flex justify-start bg-white w-96 p-10 flex-col rounded-md'>
          <p className='font-semibold text-lg text-slate-600 flex-1'>Login to your account</p>
          <form 
            className='flex flex-col'
            onSubmit={(e) => {
              e.preventDefault()
              console.log(email)
            }}
          >
            <label hidden htmlFor='email'>Email address</label>
            <input
              autoComplete='on'
              type='text'
              id='email' 
              ref={emailRef}
              required
              placeholder='Email address'
              className='border p-2 rounded-lg mt-5 text-sm text-slate-700'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='relative'>
              <label hidden htmlFor='password'>Password</label>
              <input
                autoComplete='on'
                type={passwordInputType}
                id='password' 
                required
                placeholder='Password'
                className='border p-2 rounded-lg my-5 text-sm text-slate-700 w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className='absolute top-7 right-5 z-50 text-slate-600 cursor-pointer'>{toggleIcon}</span>
            </div>
            <button 
              type='submit'
              className='bg-amber-500 rounded-md cursor-pointer p-4 font-semibold mb-5 hover:bg-amber-600'
            >
              Login
            </button>
            <Link to="/reset?email">
              <p className='text-blue-400 text-sm'>Forgot password?</p>
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login