
const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "http://pro.openweathermap.org/data/2.5/",
    jsonkey: process.env.REACT_APP_JSON_KEY
}
const getWeather = async (location) => {
    return await fetch(`${api.base}weather?q=${location}&units=imperial&APPID=${api.key}`).then((data) => data.json());

}

const SetFriendWeather = async (friendsArray, setFriendsWeather, setFriendLoading) => {
    let friendsWeather = []; 
    setFriendLoading(true);
    for(const friendArray of friendsArray){
        const data = await getWeather(friendArray.location)
        friendsWeather.push({
            data,
            name:friendArray.name
        });
    }
    //friendsWeather = await Promise.all(friendsWeather);
    setFriendsWeather(friendsWeather);
    setFriendLoading(false);
}

export default SetFriendWeather;