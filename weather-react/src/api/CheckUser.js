import axios from "axios";
import Cookies from "js-cookie";

const id = Cookies.get("user");
const url = "http://127.0.0.1:5000/get-user?id=" + id;
const CheckUser = async () => {
  let res = await axios.get(url);
  console.log(res)
  try {
    return res;
  } catch (error) {
    return error;
  }
};
export default CheckUser;
