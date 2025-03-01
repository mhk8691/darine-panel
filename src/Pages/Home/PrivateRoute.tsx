import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, condition, ...rest }) => {
    // const location = useLocation();
    // const roles = JSON.parse(sessionStorage.getItem("roles"))

    // return (
    //     <Route {...rest}>
    //         {condition ?
    //             <Component />
    //             :
    //             <Redirect to={{ pathname: "/", state: { from: location } }} />
    //         }
    //     </Route>
    // );
};

export default PrivateRoute;