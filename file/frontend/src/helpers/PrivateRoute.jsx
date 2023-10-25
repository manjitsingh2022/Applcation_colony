import React from "react";
import { Route, Redirect } from "react-router-dom";


function PrivateRoute({ component: Component, roles, ...rest }) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let next_page_link = params.next_page;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("token")) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }else{
          if (next_page_link !==null){
              return (
                <Redirect
                  to={{
                    pathname: `/${next_page_link}`,
                    state: { from: props.location },
                  }}
                />
              );
          }
        }

        // logged in so return component
        return <Component {...props} />;
      }}
    />
  );
}

export { PrivateRoute };
