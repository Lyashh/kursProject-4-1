import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from './About';
import Home from "./Home"
import Navbar from "./Navbar"

class App extends React.Component {
  render() {
    return (
      <Container fluid={true} className="wrap"> 
        <Router> 
          <Navbar /> 
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;