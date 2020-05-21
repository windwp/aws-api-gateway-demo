import { Grid, Toolbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
function App() {
  return (
    <div className="App">
      <Router>
        <AppBar position="relative" color="transparent">
          <Toolbar>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link to="/">
                  <Button variant="outlined" color="primary">Home</Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/page1">
                  <Button variant="outlined" color="primary">
                    Page 1
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/page2">
                  <Button variant="outlined" color="primary">
                    Page 2
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/page1">
            <Page1></Page1>
          </Route>
          <Route path="/page2">
            <Page2 />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
