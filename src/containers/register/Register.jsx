import {useRef, useState, useEffect} from 'react'
import usePasswordToggle from '../../components/usePasswordToggle'
import {Footer, Navbar, InfoSection} from "../../components"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInfoCircle, faCheck} from "@fortawesome/free-solid-svg-icons"
import {faCircleQuestion} from "@fortawesome/free-regular-svg-icons"
import {Link, useLocation, useNavigate} from "react-router-dom"
import "./Register.css"
import axios from '../../api/axios'
import {parsePhoneNumberFromString as parsePhoneNumber} from 'libphonenumber-js'
import {countries} from '../../data/country'
import {codes} from 'iso-country-codes'
import useAuth from "../../hooks/useAuth";


const Register = () => {
    const emailRef = useRef()
    const errRef = useRef()

    const {setAuth} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const {from} = location.state || {from: {pathname: "/login"}}

    const [country, setCountry] = useState("")
    const [countryCode, setCountryCode] = useState("")

    const [firstName, setFirstName] = useState("")
    const [firtNameFocus, setFirstNameFocus] = useState(false)
    const [firstNameEmpty, setFirstNameEmpty] = useState(false)

    const [lastName, setLastName] = useState("")
    const [lastNameFocus, setLastNameFocus] = useState(false)
    const [lastNameEmpty, setLastNameEmpty] = useState(false)

    const [businessName, setBusinessName] = useState("")
    const [businessNameFocus, setBusinessNameFocus] = useState(false)

    const [referralCode, setReferralCode] = useState("")

    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [password, setPassword] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [phoneNumber, setPhoneNumber] = useState("")
    const [validPhoneNumber, setValidPhoneNumber] = useState(false)
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    const [acceptTerms, setAcceptTerms] = useState(false)

    const [passwordInputType, toggleIcon] = usePasswordToggle()

    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/
    // const REGISTER_PATH = "/api/v1/user/register"
    const REGISTER_PATH = "register"

    let navigationTimeout

    useEffect(() => {
        const isValidEmail = EMAIL_REGEX.test(email)
        console.log(`Valid email: ${isValidEmail}`)
        email && console.log(`Email: ${email}`)
        setValidEmail(isValidEmail)
    }, [email])

    useEffect(() => {
        const isPwdValid = PWD_REGEX.test(password)
        console.log(`Valid password: ${isPwdValid}`)
        setValidPwd(isPwdValid)
    }, [password])

    useEffect(() => {
        getCountryCode(country)
    }, [country]);

    useEffect(() => {
        const phoneNumberObj = parsePhoneNumber(phoneNumber, countryCode)
        phoneNumberObj && console.log(phoneNumberObj)
        const isValidPhoneNumber = phoneNumberObj?.isValid()
        isValidPhoneNumber !== undefined && console.log(`Valid phone number: ${isValidPhoneNumber}`)
        setValidPhoneNumber(isValidPhoneNumber)
    }, [phoneNumber, countryCode])


    useEffect(() => {
        setErrMsg("")
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v1 = EMAIL_REGEX.test(email)
        const v2 = PWD_REGEX.test(password)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return
        }
        const response = await axios.post(
            REGISTER_PATH,
            {
                country,
                firstName,
                lastName,
                email,
                businessName,
                referralCode,
                phoneNumber,
                password
            },
            {
                headers: {
                    'Content-Type':
                        'application/json'
                },
                withCredentials: true
            }
        ).then((response) => {
                console.log(response?.config)
                console.log(response?.data)
                response?.data?.statusCode === 201 && console.log("Account created successfully")
                setEmail("")
                setPassword("")
                setErrMsg("")
                setSuccess(true)
                if (navigationTimeout) {
                    clearTimeout(navigationTimeout)
                }
                navigationTimeout = setTimeout(() => {
                    navigate(from, {replace: true})
                }, 10000)
            }
        ).catch((error) => {
                console.log(error)
                // log full url
                console.log(error?.config?.url)
                if (!error.response) {
                    setErrMsg("Network error")
                } else if (error.response.status === 400) {
                    setErrMsg("Invalid credentials")
                } else {
                    setErrMsg("Registration failed")
                }
            }
        )
    }

    const handleKeyPress = (event) => {
        const key = event.key;

        // Check if the key is a digit or a symbol
        if (/^[0-9~`!@#$%^&*()_+-={}\[\]|\\:;"'<>,.?/]*$/.test(key)) {
            event.preventDefault();
        }
    };

    const handleFirstNameBlur = () => {
        setFirstNameFocus(false);
        setFirstNameEmpty(firstName.trim() === '');
    };

    const handleLastNameBlur = () => {
        setLastNameFocus(false);
        setLastNameEmpty(lastName.trim() === '');
    };

    const getCountryCode = (country) => {
        const countryObj = codes.find(c => c.name === country)
        countryObj && console.log(countryObj)
        countryObj && setCountryCode(countryObj.alpha2)
    }


    return (
        <>
            {
                success ? (
                    <div
                        className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
                        <div className='bg-white w-96 p-10 flex flex-col rounded-md'>
                            <p className='font-semibold text-lg text-slate-600 flex-1'>
                                Account created successfully
                            </p>
                            <p className='text-slate-600 text-sm mt-5'>
                                We have sent a verification email to {email}. Please click on the link in the email to
                                verify your account.
                            </p>
                            <Link to="/login">
                                <button
                                    className='bg-amber-500 rounded-md cursor-pointer p-4 font-semibold my-5 hover:bg-amber-600 active:opacity-100'
                                >
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Navbar showCreateAccount={false}/>
                        <div className="flex-row flex p-20">
                            <div className='flex flex-col justify-start mr-20'>
                                <p
                                    ref={errRef}
                                    className={errMsg ? 'text-sm font-light text-red-500 px-10 py-2' : "hidden"}
                                    aria-live='assertive'
                                >
                                    {errMsg}
                                </p>
                                <div className='flex bg-white w-96 p-10 flex-col rounded-md'>
                                    <p className='font-semibold text-lg text-slate-600 flex-1'>
                                        Start getting paid with Flutterwave
                                    </p>
                                    <form
                                        className='flex flex-col'
                                        onSubmit={handleSubmit}
                                    >
                                        <label hidden htmlFor='country'>Country</label>
                                        <select
                                            id='country'
                                            required
                                            className='border p-2 rounded-lg mt-5 text-sm text-slate-700 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full'
                                            onChange={(e) => setCountry(e.target.value)}
                                        >
                                            <option value='' hidden={true} className="text-slate-700">Country</option>
                                            <option value='Nigeria'>Nigeria</option>
                                            <option value='Other Countries'>Other Countries</option>
                                        </select>
                                        {
                                            !country || country === "Nigeria" ? (
                                                <>
                                                    <label hidden htmlFor='firstName'>First name</label>
                                                    <input
                                                        autoComplete='off'
                                                        type='text'
                                                        id='firstName'
                                                        required
                                                        placeholder='First name'
                                                        className='border p-2 rounded-lg mt-5 text-sm text-slate-700 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full'
                                                        value={firstName}
                                                        onChange={(e) => {
                                                            setFirstName(e.target.value)
                                                            setFirstNameEmpty(false)
                                                        }}
                                                        onFocus={() => setFirstNameFocus(true)}
                                                        onBlur={handleFirstNameBlur}
                                                        onKeyPress={handleKeyPress}
                                                    />
                                                    {
                                                        firstNameEmpty && (
                                                            <p className='bg-amber-400 p-1 mt-2 rounded-md font-thin text-sm'>
                                                                <FontAwesomeIcon icon={faInfoCircle} className='mx-2'/>
                                                                First name is required
                                                            </p>
                                                        )
                                                    }
                                                    <label hidden htmlFor='lastName'>Last name</label>
                                                    <input
                                                        autoComplete='off'
                                                        type='text'
                                                        id='lastName'
                                                        required
                                                        placeholder='Last name'
                                                        className='border p-2 rounded-lg mt-5 text-sm text-slate-700 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full'
                                                        value={lastName}
                                                        onChange={(e) => {
                                                            setLastName(e.target.value)
                                                            setLastNameEmpty(false)
                                                        }}
                                                        onFocus={() => setLastNameFocus(true)}
                                                        onBlur={handleLastNameBlur}
                                                        onKeyPress={handleKeyPress}
                                                    />
                                                    {
                                                        lastNameEmpty && (
                                                            <p className='bg-amber-400 p-1 mt-2 rounded-md font-thin text-sm'>
                                                                <FontAwesomeIcon icon={faInfoCircle} className='mx-2'/>
                                                                Last name is required
                                                            </p>
                                                        )
                                                    }
                                                    <label hidden htmlFor='email'>Email address</label>
                                                    <input
                                                        autoComplete='off'
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
                                                        <label hidden htmlFor='businessName'>Business name</label>
                                                        <input
                                                            autoComplete='off'
                                                            type='text'
                                                            id='businessName'
                                                            required
                                                            placeholder='Trading/Business name'
                                                            className='border p-2 rounded-lg mt-5 text-sm text-slate-700 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full'
                                                            value={businessName}
                                                            onChange={(e) => setBusinessName(e.target.value)}
                                                            onFocus={() => setBusinessNameFocus(true)}
                                                            onBlur={() => setBusinessNameFocus(false)}
                                                        />
                                                        <span
                                                            className='absolute top-7 right-3 z-50 text-slate-600 cursor-pointer'>
                                <FontAwesomeIcon icon={faCircleQuestion} className='mx-2'/>
                            </span>
                                                    </div>
                                                    <label hidden htmlFor='referralCode'>Referral code</label>
                                                    <input
                                                        autoComplete='off'
                                                        type='text'
                                                        id='referralCode'
                                                        required={false}
                                                        placeholder='Referral code (optional)'
                                                        className='border p-2 rounded-lg mt-5 text-sm text-slate-700 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full'
                                                        value={referralCode}
                                                        onChange={(e) => setReferralCode(e.target.value)}
                                                    />
                                                    <label hidden htmlFor='phoneNumber'>Phone number</label>
                                                    <input
                                                        autoComplete='off'
                                                        type='text'
                                                        id='phoneNumber'
                                                        required
                                                        placeholder='Phone number'
                                                        className='border p-2 rounded-lg mt-5 text-sm text-slate-700 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full'
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        onFocus={() => setPhoneNumberFocus(true)}
                                                        onBlur={() => setPhoneNumberFocus(false)}
                                                        aria-invalid={validPhoneNumber ? "false" : "true"}
                                                        aria-describedby='phonenote'
                                                    />
                                                    <p id='phonenote'
                                                       className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "bg-amber-400 p-1 mt-2 rounded-md font-thin text-sm" : "hidden"}>
                                                        <FontAwesomeIcon icon={faInfoCircle} className='mx-2'/>
                                                        Must be a valid phone number
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
                                                        Must include uppercase and lowercase letters, a number and a
                                                        special
                                                        character
                                                    </p>
                                                    <button
                                                        disabled={!!(!validEmail || !validPwd || !validPhoneNumber || !acceptTerms)}
                                                        className='bg-amber-500 rounded-md cursor-pointer p-4 font-semibold mb-5 hover:bg-amber-600 active:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed'
                                                    >
                                                        Create your account
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className='bg-amber-500 rounded-md cursor-pointer p-4 font-semibold my-5 hover:bg-amber-600 active:opacity-100'
                                                    >
                                                        Contact Sales
                                                    </button>
                                                </>
                                            )
                                        }

                                        {/*    Checkbox to accept terms with the box line amber and the tick float into the box*/}
                                        <div className='flex flex-row'>
                                            <label htmlFor="check-box" className="relative cursor-pointer">
                                                <input
                                                    type="checkbox" id="check-box"
                                                    className="form-checkbox h-4 w-4 rounded-sm mt-1 appearance-none border-[1px] border-amber-500"
                                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className='text-amber-500 h-3 w-3 absolute left-0.5 top-1.5 right-0 text-opacity-0 checkmark transition'/>
                                            </label>
                                            <p className='text-sm text-slate-600 ml-4'>
                                                I acknowledge that I have read and do
                                                hereby accept the terms and conditions
                                                in the Flutterwave's
                                                <Link to="/terms" className='text-amber-600'> Terms of Use</Link>,
                                                <Link to="/onboarding/agreement?contact="
                                                      className='text-amber-600'> Merchant
                                                    Agreement</Link> and
                                                <Link to="privacy-policy" className='text-amber-600'> Privacy
                                                    Policy</Link>.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="flex flex-col py-16">
                                <InfoSection
                                    heading="Sell and get paid easily online or offline"
                                    message="With Flutterwave, you can setup an online store, create payment and donation links, receive payments on your website or get our POS device."
                                />
                                <InfoSection
                                    heading="Receive payments in over 30 currencies"
                                    message="Take your business global with multiple payment methods like credit cards, mobile money, QR, bank account, USSD and more."
                                />
                                <InfoSection
                                    heading="All in one business management tool"
                                    message="Manage your business efficiently on your Flutterwave dashboard. Track sales and customers, manage inventories, send invoices and so much more."
                                />
                            </div>
                        </div>
                        <Footer/>
                    </div>
                )
            }
        </>
    )
}

export default Register