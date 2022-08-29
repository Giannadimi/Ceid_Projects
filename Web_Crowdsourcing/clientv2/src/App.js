import React from "react";
import "./App.css";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserDashboard from "./Pages/User/UserDashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
//ROUTING
import { Route } from "react-router-dom";

/*Server Default URL*/
export const BaseURL = "http://localhost:8080/";

function App() {
  return (
    <div className="App">
      <Route exact={true} path="/" component={Login} />
      <Route exact={true} path="/signup" component={SignUp} />
      <Route
        exact={true}
        path="/adminPage"
        /*component={AdminPage}*/ render={(props) => (
          <AdminDashboard {...props} />
        )}
      />
      <Route
        exact={true}
        path="/userPage"
        render={(props) => <UserDashboard {...props} />}
      />
      {/*<AdminDashboard/>*/}
      {/*<Login/>*/}
    </div>
  );
}

export default App;
