import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import App from './App'
import './index.css'
import {AuthProvider} from './context/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/*' element={<App/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    </React.StrictMode>,
)
