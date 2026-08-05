import { Component } from "react";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import { Outlet } from "react-router-dom";

export default  class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    );
  }
}


