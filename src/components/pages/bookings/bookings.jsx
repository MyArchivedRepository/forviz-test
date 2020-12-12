import React from 'react'
import {Route} from 'react-router-dom' 
import Test from './test'

const Bookings = () => {

    console.log()
    return(
        <div>
        <h1>Bookings Page</h1>
        <Route path='/bookings/:params' >
            <Test/>
        </Route>
        </div>
    )   
}

export default Bookings;