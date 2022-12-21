import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getMessage();
    }
  }, [store.token]);

  return (
    <div className="text-center mt-5">
      <h1>Exercise of Authentication</h1>
    </div>
  );
};
