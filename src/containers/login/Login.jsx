import {useRef, useState, useEffect} from 'react'
import usePasswordToggle from '../../components/usePasswordToggle'
import {Footer, Navbar} from "../../components"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons"
import {Link, useNavigate, useLocation} from "react-router-dom"
import "./Login.css"
import axios from '../../api/axios'
import useAuth from "../../hooks/useAuth"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Login = () => {

    const {setAuth, persistedAuth, setPersistedAuth} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const {from} = location.state || {from: {pathname: '/dashboard'}}


    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [password, setPassword] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    const [passwordInputType, toggleIcon] = usePasswordToggle()
    const [showTrustDevicePopup, setShowTrustDevicePopup] = useState(false)

    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/
    const LOGIN_URL = "/auth"
    // const LOGIN_URL = "/api/v1/user/register"

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

    useEffect(() => {
        setErrMsg("")
    }, [email, password])

    useEffect(() => {
        localStorage.setItem("persistAuth", persistedAuth)
    }, [persistedAuth])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const v1 = EMAIL_REGEX.test(email)
        const v2 = PWD_REGEX.test(password)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return
        }

        const response = await axios.post(LOGIN_URL,
            {email, password},
            {headers: {'Content-Type': 'application/json'}, withCredentials: true}
        ).then(
            (response) => {
                console.log(response)
                console.log(JSON.stringify(response?.data))
                const accessToken = response?.data?.accessToken
                const roles = response?.data?.roles
                setAuth({email, password, roles, accessToken})
                setEmail("")
                setPassword("")
                navigate(from, {replace: true})
            }
        ).catch(
            (error) => {
                console.log(error)
                if (!error.response) {
                    setErrMsg("Network error")
                } else if (error.response.status === 400) {
                    setErrMsg("Invalid credentials")
                } else if (error.response.status === 401) {
                    setErrMsg("Unauthorized")
                } else {
                    setErrMsg("Login failed")
                }
            }
        )
    }

    const TrustDevicePopup = () => (
        <Popup
            open={showTrustDevicePopup}
            closeOnDocumentClick
            onClose={() => setShowTrustDevicePopup(false)}
            modal
            position="right center"
        >
            <div className="p-6 flex flex-col items-center">
                <div className="font-bold">Trust this device?</div>
                <div className="text-sm">
                    <p>
                        This device will be remembered and you will not be asked to
                        enter a login again unless you sign out from this device.
                    </p>
                </div>
                <div className="flex w-full justify-around">
                    <button
                        className="px-4 py-2 bg-amber-500 rounded-md text-slate-700 font-semibold hover:ring-4 hover:bg-amber-600 hover:ring-amber-300 hover:ring-opacity-20 hover:border-transparent transition duration-500 ease-in-out"
                        type="button"
                        onClick={
                            (event) => {
                                setPersistedAuth(true)
                                setShowTrustDevicePopup(false)
                                handleSubmit(event)
                            }
                        }
                    >
                        Yes
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 rounded-md text-slate-700 font-semibold hover:ring-4 hover:bg-red-600 hover:ring-red-300 hover:ring-opacity-20 hover:border-transparent transition duration-500 ease-in-out"
                        type="button"
                        onClick={
                            () => {
                                setPersistedAuth(false)
                                setShowTrustDevicePopup(false)
                                handleSubmit(event)
                            }
                        }
                    >
                        No
                    </button>
                </div>
            </div>
        </Popup>
    );

    return (
        <div>
            <Navbar showCreateAccount={true}/>
            <div className='flex p-20 flex-col justify-start'>
                <p
                    ref={errRef}
                    className={errMsg ? 'text-sm font-light text-red-500 px-10 py-2' : "hidden"}
                    aria-live='assertive'
                >
                    {errMsg}
                </p>
                <div className='flex bg-white w-96 p-10 flex-col rounded-md'>
                    <p className='font-semibold text-lg text-slate-600 flex-1'>
                        Login to your account
                    </p>
                    <form
                        className='flex flex-col'
                        onSubmit={handleSubmit}
                    >
                        <label hidden htmlFor='email'>Email address</label>
                        <input
                            autoComplete='on'
                            type='text'
                            id='email'
                            ref={emailRef}
                            required
                            placeholder='Email address'
                            className='border p-2 rounded-lg mt-5 text-sm text-slate-700 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby='emailnote'
                        />
                        <p id='emailnote'
                           className={emailFocus && email && !validEmail ? "bg-amber-400 p-1 mt-2 rounded-md font-thin text-sm" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} className='mx-2'/>
                            Must be a valid email address
                        </p>
                        <div className='relative'>
                            <label hidden htmlFor='password'>Password</label>
                            <input
                                type={passwordInputType}
                                id='password'
                                required
                                placeholder='Password'
                                className='border p-2 rounded-lg my-5 text-sm text-slate-700 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby='pwdnote'
                            />
                            <span
                                className='absolute top-7 right-5 z-50 text-slate-600 cursor-pointer'>{toggleIcon}</span>
                        </div>
                        <p id='pwdnote'
                           className={pwdFocus && !validPwd ? "bg-amber-400 p-1 mb-3 rounded-md font-thin text-sm" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} className='mx-2'/>
                            8 to 24 characters<br/>
                            Must include uppercase and lowercase letters, a number and a special character
                        </p>
                        <button
                            type="button"
                            disabled={!!(!validEmail || !validPwd)}
                            className='bg-amber-500 rounded-md cursor-pointer p-4 font-semibold mb-5 hover:bg-amber-600 active:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed'
                            onClick={() => setShowTrustDevicePopup(true)}
                        >
                            Login
                        </button>
                        {
                            TrustDevicePopup()
                        }
                        <Link to="/reset?email">
                            <p className='text-blue-400 text-sm'>Forgot password?</p>
                        </Link>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login