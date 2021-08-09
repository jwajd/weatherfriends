import axios from 'axios';

const CreateUser = async() => {
    let res = await axios.get('http://127.0.0.1:5000/create-user');
    const d = res.data
    return d;
}
export default CreateUser;