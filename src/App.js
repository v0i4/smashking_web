import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Lanches from './components/Lanches';
import Pedidos from './components/Pedidos';
import CreateLanche from './components/CreateLanche';

function App() {
  return (

     <Router>

        <Navbar />

        <Route path="/" exact>
          <Home />
        </Route>
        
        <Route path="/lanches">
        <CreateLanche />
        </Route>

       <Route path="/pedidos">
       <Pedidos />
       </Route>
     </Router>
  );
}

export default App;
