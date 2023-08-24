import './App.css'
import {Login, Register, Home, Dashboard, AdminDashboard, NotFound, Unauthorized, ServerError} from "./containers"
import {Routes, Route} from "react-router-dom"
import {Layout, RequireAuth} from "./components"
import roles from "./data/roles"
import PersistLogin from "./components/auth/PersistLogin"

function App() {

    return (
        <div className='w-full overflow-hidden'>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    {/*Public Routes*/}
                    <Route path="/home" element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>

                    {/*Private Routes*/}
                    {/*User Routes*/}
                    <Route element={<PersistLogin/>}>
                        <Route element={<RequireAuth allowedRoles={[2001, 5150]}/>}>
                            <Route path='/dashboard' element={<Dashboard/>}/>
                        </Route>

                        {/*Admin Routes*/}
                        <Route element={<RequireAuth allowedRoles={[5150]}/>}>
                            <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
                        </Route>
                    </Route>

                    {/*Error Routes*/}
                    <Route path='/not-found' element={<NotFound/>}/>
                    <Route path='/unauthorized' element={<Unauthorized/>}/>
                    <Route path='/server-error' element={<ServerError/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
