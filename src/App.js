import React from "react";
import { Route, Switch } from "react-router";

import "./App.css";
import Header from "./components/header/header.component";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  state = {
    currentUser: null,
  };

  // property in which you save the authenticated user when the component did mount
  unsubscribeFromAuth = null;

  componentDidMount() {
    // onAuthStateChanged  firebase method that creates a stream whenever the authentication changes (a subscription is created)
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            },
            () => {
              console.log("current user state", this.state);
            }
          );
        });
      }

      this.setState({ currentUser: userAuth });
    });
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
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
