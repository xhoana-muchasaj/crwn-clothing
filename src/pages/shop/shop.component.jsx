import React from "react";
import { connect } from "react-redux";
//for routing
import { Route } from "react-router";

import { firestore } from "../../firebase/firebase.utils";

import { convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";

import { updateCollections } from "../../redux/shop/shop.actions";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    /** FETCH PATTERN-if we use another type of db
     fetch('https://firestore.googleapis.com/v1/projects/crwn-db-bc33a/databases/(default)/documents/collections')
    .then(response=>response.json())
    .then(collections=>{
      console.log('collections',collections)
    })
     */

    /** --PROMISE PATTERN-- using FIREBASE
     * the only time that we will get refreshed data from back end is when the shop remounts 
     * we make the api call
      collectionRef.get().then((snapshot) => {
      const collectionsMap = convertCollectionSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
     */

    /**---OBSERVABLE PATTERN---- using FIREBASE
     * the data is updated whenever it changes, a live stream is created
     */
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        // console.log(snapshot)

        /**the function in which is passed che snapshot of the collections received from firebase,
         * the function returns the object with data from this snapshot
         */
        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    );
  }
  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionsPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
