import axios from "axios";
import Cookies from "js-cookie";

const id = Cookies.get("user");
const UpdateUser = async (props) => {
  const url =
    "http://127.0.0.1:5000/update-user?id=" +
    id +
    "&name=" +
    props.state.Name +
    "&location=" +
    props.state.Location;
  let res = await axios.get(url);
  const d = await res.data;
  return d;
};
export default UpdateUser;
