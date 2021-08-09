/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Search from "./api/Search";
import CreateUser from "./api/CreateUser";
import CheckUser from "./api/CheckUser";
import SYW from "./api/SYW";
import Display from "./components/display";
import setFriendWeather from "./api/setFriendWeather";
import Form from "./components/form";
import FetchDB from "./api/FetchDB";
import Cookies from "js-cookie";
import users from "./friends";
function App() {
  if (!Cookies.get("user")) {
    Cookies.set(
      "user",
      CreateUser().then((data) => Cookies.set("user", data))
    );
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  const initialState = {
    Name: "",
    Location: "",
    Visibile: true,
  };

  const [weatherData, setWeatherData] = useState(null);
  const [yourWeather, setYourWeather] = useState(null);
  const [friendsWeather, setFriendsWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [homeloading, setHomeLoading] = useState(true);
  const [friendloading, setFriendLoading] = useState(true);
  const [data, setData] = useState(initialState);
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  useEffect(() => {
    CheckUser()
      // eslint-disable-next-line no-sequences
      .then((res) => (console.log(res.data[0]), setData(res.data[0])))
      .catch((err) => console.error(`${err}`));
    console.log("a");
  }, []);

  useEffect(() => {
    console.log(data);
    if (data.Location) {
      SYW(data.Location, setYourWeather, setHomeLoading);
    }
  }, [data]);
  useEffect(() => {
    setFriendWeather(users, setFriendsWeather, setFriendLoading);
  }, [setFriendsWeather, setFriendLoading]);
  return (
    <div className="app">
      <main>
        <>
          <Search setWeatherData={setWeatherData} setLoading={setLoading} />
          <Display weatherData={weatherData} loading={loading} />
        </>

        <>
          {!data.Name ? (
            <Form
              state={state}
              setState={setState}
              error={error}
              setError={setError}
              setData={setData}
            />
          ) : (
            <>
              <h1 style={{marginBottom: 0, marginTop: 55}}>Your Weather</h1>
              <Display weatherData={yourWeather} loading={homeloading} />
              {friendsWeather
                ? friendsWeather.map((friendWeather, i) => (
                    <Display
                      key={String(i)}
                      title={friendWeather.name}
                      weatherData={friendWeather.data}
                      loading={friendloading}
                    />
                  ))
                : null}
            </>
          )}
        </>
      </main>
    </div>
  );
}

export default App;
