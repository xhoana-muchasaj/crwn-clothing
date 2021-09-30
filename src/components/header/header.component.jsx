import React from "react";
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

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo"></Logo>
    </LogoContainer>

    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>

      <OptionLink to="/contact">CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}

      <CartIcon />
    </OptionsContainer>

    {hidden ? null : <CartDropDown />}
  </HeaderContainer>
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
