import React, { useState, useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage"
import "./App.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import { getSpots } from "./store/spots";
import SpotPage from "./components/SpotPage"
import SpotsPage from "./components/SpotsPage"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  useEffect(()=>{
    dispatch(getSpots())
  },[])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path = "/cities/:city">
            <SpotsPage />
          </Route>
          <Route exact path = "/spots">
            <SpotsPage />
          </Route>
          <Route path = "/spots/:spotId">
            <SpotPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
