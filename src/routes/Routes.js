import { useLayoutEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LayoutComponent from "../layouts/LayoutComponent";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Games from "../pages/Games";
import GamesDetail from "../pages/GamesDetail";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MoviesDetail from "../pages/MoviesDetail";

const Routes = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <LayoutComponent content={<Home />} />
        </Route>
        <Route path="/movies" exact>
          <LayoutComponent content={<Movies />} />
        </Route>
        <Route path="/movies/:id" exact>
          <LayoutComponent content={<MoviesDetail />} />
        </Route>
        <Route path="/games" exact>
          <LayoutComponent content={<Games />} />
        </Route>
        <Route path="/games/:id" exact>
          <LayoutComponent content={<GamesDetail />} />
        </Route>
        <Route path="/login" exact>
          <LayoutComponent content={<Login />} />
        </Route>
        <Route path="/register" exact>
          <LayoutComponent content={<Register />} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
