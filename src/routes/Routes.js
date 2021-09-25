import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LayoutComponent from "../layouts/LayoutComponent";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Games from "../pages/Games";
import GamesDetail from "../pages/GamesDetail";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MoviesDetail from "../pages/MoviesDetail";
import Cookies from "js-cookie"
import AdminMovieList from "../pages/admin/movie/List";
import AdminMovieCreate from "../pages/admin/movie/Create";
import AdminMovieEdit from "../pages/admin/movie/Edit";
import AdminGameList from "../pages/admin/game/List";
import AdminGameCreate from "../pages/admin/game/Create";
import AdminGameEdit from "../pages/admin/game/Edit";

const Routes = () => {

  const ValidatedRoute = (props) => {
    if (Cookies.get("user_token")) {
      return <Route {...props} />
    }

    return <Redirect to="/login" />
  }

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
        <ValidatedRoute path="/admin/movies" exact>
          <LayoutComponent content={<AdminMovieList />} />
        </ValidatedRoute>
        <ValidatedRoute path="/admin/movies/create" exact>
          <LayoutComponent content={<AdminMovieCreate />} />
        </ValidatedRoute>
        <ValidatedRoute path="/admin/movies/edit/:id" exact>
          <LayoutComponent content={<AdminMovieEdit />} />
        </ValidatedRoute>
        <ValidatedRoute path="/admin/games" exact>
          <LayoutComponent content={<AdminGameList />} />
        </ValidatedRoute>
        <ValidatedRoute path="/admin/games/create" exact>
          <LayoutComponent content={<AdminGameCreate />} />
        </ValidatedRoute>
        <ValidatedRoute path="/admin/games/edit/:id" exact>
          <LayoutComponent content={<AdminGameEdit />} />
        </ValidatedRoute>
        <ValidatedRoute path="/admin/change-password" exact>
          <LayoutComponent content={<AdminMovieCreate />} />
        </ValidatedRoute>
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
