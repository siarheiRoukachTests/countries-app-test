import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Country } from "./pages/Country";
import { NotFound } from "./pages/NotFound";

export const App = () => {
  return (
    <Switch>
      <Route exact path="/country/:countryCode" component={Country} />
      <Route exact path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};
