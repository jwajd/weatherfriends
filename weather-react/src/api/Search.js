import React, { useState } from 'react';

const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "//api.openweathermap.org/data/2.5/",
    jsonkey: process.env.REACT_APP_JSON_KEY
}

class Search extends React.Component {
    constructor(props){
        super();
        this.state = {
            query: '',
            weather: {}

        }
    }


    SearchCall = evt => {
        if (evt.key === "Enter") {
            this.props.setLoading(true);
            fetch(`${api.base}weather?q=${this.state.query}&units=imperial&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                this.setState({weather: result});
                this.setState({query: ''})
                console.log(result);
                this.props.setWeatherData(result);
                this.props.setLoading(false);
            });
        }
    }

    SearchBox = () => (

        <div className="search-box">
            <input 
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={e => this.setState({query: e.target.value})}
                value={this.state.query}
                onKeyPress={this.SearchCall}
            />
        </div>
    );
    render(){
        return <this.SearchBox/>
    }
}

export default Search;