import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CustomersList from './CustomersList';
import CustomerCreateUpdate from './CustomerCreateUpdate';


export default class App extends Component {
  render() {
    return (
      <Router>
      <section className="section">
        <section className="container">
          <section className="content">
            <Route path="/" exact component={CustomersList} />
            <Route path="/customer/:pk" exact component={CustomerCreateUpdate}/>
            <Route path="/customer/" exact component={CustomerCreateUpdate}/>
          </section>
        </section>
      </section>
      </Router>
    )
  
  }
}
