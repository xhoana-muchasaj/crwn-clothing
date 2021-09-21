import React from "react";
import { Link } from "react-router-dom";
//connect is a higher order component let's us modify our components to take things related to redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

//special syntax in react for importing svg
import { ReactComponent as Logo } from "../../assets/crown.svg";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";

//selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

import "./header.styles.scss";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo"></Logo>
    </Link>

    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>

    {hidden ? null : <CartDropDown />}
  </div>
);

// the first argument of connect is going to be the function (mapStateToProps) that allows us to access the state,
// with the state being our reducer
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});
/**
 * const mapStateToProps = (state) => ({
  currentUser:selectCurrentUser(state),
  hidden:selectCartHidden(state),
});
*/

// high order components are just functions that take components as arguments and return a new supped up component
export default connect(mapStateToProps)(Header);
