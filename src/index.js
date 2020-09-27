import "babel-polyfill";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import ReduxToastr from "react-redux-toastr";
import Router from "./views/Router";
import Root from "./Root";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "./views/login";
import ProtectedRoute from "./views/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "./index.scss";

ReactDOM.render(
  <div className="app-container">
    <BrowserRouter basename="/">
      <Root>
        <Fragment>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <ProtectedRoute exact={true} path="/" component={Router} />
            <ProtectedRoute path="/home" component={Router} />
            <ProtectedRoute path="/manage-category" component={Router} />
            <ProtectedRoute path="/manage-cr/create-cr" component={Router} />
            <ProtectedRoute path="/manage-user" component={Router} />
            <ProtectedRoute path="/manage-partner" component={Router} />
            <ProtectedRoute path="/settings" component={Router} />
            <ProtectedRoute path="/notifications" component={Router} />
            <ProtectedRoute path="/manage-contract" component={Router} />
            <ProtectedRoute path="/manage-ground-price" component={Router} />
            <ProtectedRoute path="/manage-station" component={Router} />
          </Switch>
          <ReduxToastr
            timeOut={3000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </Fragment>
      </Root>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
