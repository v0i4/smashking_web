import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"

function Navbar() {
    return <nav className="navbar navbar-dark bg-dark">
        <h4><Link className="link" to="/">Home</Link></h4>
        <h4><Link className="link" to="/lanches">Gerenciar Cardapio</Link></h4>
        <h4><Link className="link" to="/pedidos">Gerenciar Pedidos</Link></h4>
       
        </nav>

}

export default Navbar;