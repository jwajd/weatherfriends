
const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "http://pro.openweathermap.org/data/2.5/",
    jsonkey: process.env.REACT_APP_JSON_KEY
}
const getWeather = async (location) => {
    return await fetch(`${api.base}weather?q=${location}&units=imperial&APPID=${api.key}`).then((data) => data.json());
}

const SYW = async (location, setYourWeather, setHomeLoading) => {
    setHomeLoading(true);
    const w = await getWeather(location)
    setYourWeather(w);
    setHomeLoading(false);
}

export default SYW;