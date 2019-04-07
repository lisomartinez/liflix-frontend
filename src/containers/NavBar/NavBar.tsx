import React, {FunctionComponent, useState, ReactNode } from "react";
import classes from './NavBar.module.scss';
import Toggle from './toggle.svg';
import {Link} from "react-router-dom";

const NavBar: FunctionComponent = () => {
    const [menu, toogleMenu] = useState(false);

    const MenuDiv: ReactNode = <div>MENU</div>;

    return (
      <nav className={classes.Navbar}>
          <div className={classes.Logo}>LIFLIX</div>
          <img
              className={classes.Toggle}
              src={Toggle}
              onClick={() => toogleMenu(menu ? false : true)}/>
          {menu ? MenuDiv : null}
          <ul className={classes.List}>
              <Link className={classes.ListItem} to={"/"} >Home</Link>
              <li className={classes.ListItem}>My list</li>
              <li className={classes.ListItem}>Releases</li>
          </ul>
      </nav>
    );
};

export default NavBar;