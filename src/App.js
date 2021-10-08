import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

//selectors
import { selectCurrentUser } from "./redux/user/user.selectors";

import { checkUserSession } from "./redux/user/user.actions";

class App extends React.Component {
  // property in which you save the authenticated user when the component did mount
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;

    /**
     * triggering the action checkUserSession
     * the saga is listening to this action
     */
    checkUserSession();
  }

  // when the component unmounts the authenticated saved user is set to null (closes the subscription)
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

//allows access to the state
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// specifies actions your component might need to dispatch as props
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

/**------OBSERVABLE BASED---------
     * onAuthStateChanged  firebase method that creates a stream
     * whenever the authentication changes (a subscription is created)
     * 
     this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        //console.log("PROPS", this.props);
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          //using redux for passing props
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
     */
