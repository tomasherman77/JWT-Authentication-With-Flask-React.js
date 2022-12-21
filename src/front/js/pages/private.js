import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const apiURL = process.env.BACKEND_URL + "/api/user/" + store.id;

  useEffect(() => {
    getUserInfo();
  }, [store.token]);

  const getUserInfo = async () => {
    const ops = {
      headers: { Authorization: "Bearer " + store.token },
    };
    try {
      const response = await fetch(apiURL, ops);
      if (response.status !== 200) {
        alert("There has been an error on the response.status");
        return false;
      }
      const data = await response.json();
      console.log("data from the backend ", data);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error(
        "There has been an error getting the information through fetch ",
        error
      );
    }
  };

  if (store.token === null) navigate("/");

  return (
    <div className="m-auto w-50 my-3">
      <h1> I am the private page</h1>
      <h3>My id email: {store.email}</h3>
      <h3>My id id: {store.id}</h3>
    </div>
  );
};
