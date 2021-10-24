import React, { memo, ReactNode, useMemo } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface PrivateRouteProps extends RouteProps {
    children: ReactNode
}

const PrivateRoute = memo(({ children, path, ...props }: PrivateRouteProps) => {
    const loggedIn = useAppSelector(state => state.user.loggedIn);

    const redirectParam = useMemo(() => {
        if (path === "/") {
            return "";
        }
        return `/?redirect=${encodeURIComponent(props.location.pathname)}`;
    }, [path])

    return (
        <Route {...props}
            render={(props) => loggedIn ? children :
                <Redirect to={{ pathname: `/login${redirectParam}`, state: { from: props.location } }} />}
        />
    );
});

export default PrivateRoute;