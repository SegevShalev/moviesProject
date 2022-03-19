import React, { useState, useEffect } from "react";
import axios from "axios";
import MediaComponents from "./MediaComponents";
import "../style/homeComp.css";
import Modal from "react-modal";
import ModalComponent from "./ModalComponent";

function HomeComponent() {
  const [trending, setTrending] = useState([]);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [selected, setSelected] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  Modal.setAppElement("#portal");

  useEffect(() => {
    async function fetchData() {
      try {
        let fetchData = (await axios.get(`http://localhost:8080/watch`)).data;
        setTrending(fetchData);
        console.log(fetchData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const enterKeyHandle = async (event) => {
    if (event.key === "Enter") {
      await loginUser();
    }
  };

  const loginUser = async () => {
    try {
      const userLogin = await axios.post(`http://localhost:8080/login`, {
        email: username,
        password: password,
      });
      setLoginError(false);
      console.log(userLogin);
      setToken(userLogin?.data?.user?.token || null);
    } catch (err) {
      setLoginError(true);
      console.log(err);
    }
  };

  const logOutUser = async () => {
    if (token) {
      try {
        await axios.post(
          "http://localhost:8080/logout",
          {
            email: username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        setToken(null);
      } catch (err) {}
    }
  };

  const selectedMovieCallback = (selected) => {
    setSelected(selected);
    setIsOpen(!isOpen);
    console.log(selected.title);
  };

  let error;
  if (loginError === true) {
    error = (
      <div>
        {" "}
        <label className="errorLog">your login failed</label>
      </div>
    );
  }

  let login = (
    <div className="loginCon">
      <div className="loginText">
        <input
          type="text"
          placeholder="enter User name"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => enterKeyHandle(e)}
        />
        <input
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => enterKeyHandle(e)}
        />
        <button className="bgRed" onClick={() => loginUser()}>
          Login
        </button>
      </div>
      {error}
      <div className="loginButtoms">
        <button className="bgBlue">SignUp</button>
      </div>
    </div>
  );

  if (token !== null) {
    login = (
      <div className="white">
        Hello, {username} {"\u00A0"}
        <button className="btnBlack" onClick={() => logOutUser()}>
          LOG OUT
        </button>
      </div>
    );
  }

  let data = "loading...";
  if (trending !== null) {
    data = trending.map((item) => {
      let text = item.title;
      if (item.title.length > 40) {
        text = text.substring(0, 40);
      }
      return (
        <MediaComponents
          key={item.title}
          poster={item.poster}
          title={text}
          id={item.id}
          mediaType={item.media_type}
          movieCallback={(movie) => selectedMovieCallback(movie)}
        />
      );
    });
  }

  /* let selectedMovie = selected
  if(selectedMovie){
    console.log(selected)
  } */

  return (
    <div>
      {login}
      <input type="text" placeholder="type to search..." />
      <br />
      <br />
      <div className="layout">
        {data} <br />
        <br />
      </div>
      {/* <ModalComponent open={isOpen}/> */}

      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.55)",
          },
          content: {
            position: "absolute",
            top: "80px",
            left: "300px",
            right: "300px",
            bottom: "80px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="My dialog"
      >
        <div>
          {selected?.title}
        </div>
        <button onClick={() => setIsOpen(false)}>X</button>
      </Modal>
    </div>
  );
}

export default HomeComponent;
