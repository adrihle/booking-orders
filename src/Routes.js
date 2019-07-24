import React from 'react'
import NavBar from './frontend/components/NavBar'
import Login from './frontend/views/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default function Routes() {
    return(
        <div>
            <NavBar/>
            <Login />
        </div>
    )
}