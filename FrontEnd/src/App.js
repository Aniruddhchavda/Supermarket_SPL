import './App.css';

import {Inventory} from './inventory/inventory';
import {Customer} from './inventory/Customer';
import {Navigation} from './Navigation/Navigation';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Container>
     <Switch>
       <Route path='/' component={Inventory} exact/>
       <Route path='/customer' component={Customer}/>
     </Switch>
     </Container>

    </BrowserRouter>

  );
}

export default App;
