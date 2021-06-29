import React, { ReactNode } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface PrivateRouteProps extends RouteProps {
    children: ReactNode
}

export default function PrivateRoute({ children, ...props }: PrivateRouteProps) {
    const loggedIn = useAppSelector(state => state.user.loggedIn);

    return (
        <Route {...props}
            render={(props) => loggedIn ? children :
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    );
};