const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      id: null,
      email: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },

    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != undefined && token != "")
          setStore({ token: token });
      },

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({
          token: null,
          id: null,
        });
      },

      signup: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/signup",
            opts
          );
          if (resp.status !== 200) {
            alert("There has been some error");
            return false;
          }
          const data = await resp.json();
          console.log("User created data response", data);
          setStore({ id: data.id });
          return true;
        } catch (error) {
          console.error("There has been an error signing up:", error);
        }
      },

      login: async (email, password) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/token",
            options
          );
          if (response.status !== 200) {
            alert("Error with the login fetch response");
            return false;
          }
          const data = await response.json();
          sessionStorage.setItem("token", data.access_token);
          setStore({
            token: data.access_token,
            id: data.id,
            email: data.email,
          });
          return true;
        } catch (error) {
          console.error("There was an error login in ", error);
        }
      },

      getMessage: async () => {
        const store = getStore();
        const ops = {
          headers: { Authorization: "Bearer " + store.token },
        };
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello", ops);
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
