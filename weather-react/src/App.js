/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Search from './api/Search'
import Display from './components/display'
import FetchDB from './api/FetchDB'

//<Display weatherData = {weatherData} loading = {loading}/>


function App(){
    const[weatherData, setWeatherData] = useState(null);
    const[loading, setLoading] = useState();

    return(
        <div className="app">
            <main>
                <Search setWeatherData = {setWeatherData} setLoading = {setLoading}/>
                <Display weatherData = {weatherData} loading = {loading}/>
                <FetchDB/>
                
            </main>
        </div>
    )

}

export default App;

