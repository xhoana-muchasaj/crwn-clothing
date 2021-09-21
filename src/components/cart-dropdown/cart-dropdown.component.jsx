import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";

import "./cart-dropdown.styles.scss";

const CartDropDown = ({ cartItems,history}) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton onClick={()=>history.push('/checkout')}>GO TO CHECKOUT</CustomButton>
  </div>
);

// pulling the state in and getting the cartItems
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

//withRouter component gives access to history
export default withRouter(connect(mapStateToProps)(CartDropDown));
