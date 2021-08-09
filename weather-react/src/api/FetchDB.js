import React from 'react';
import axios from 'axios';

class FetchDB extends React.Component{
    

        
        fetchInfo = async() => {
            const res = await axios.get('http://127.0.0.1:5000/get?id=jim');

        }
        componentDidMount(){
            this.fetchInfo();
        }
        componentDidUpdate(){
            this.fetchInfo();
        }
        render(){
            return null;
        }

}
export default FetchDB;