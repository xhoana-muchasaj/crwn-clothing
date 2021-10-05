import React from "react";
//for routing
import { Route } from "react-router";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { firestore } from "../../firebase/firebase.utils";
import { convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";

import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        // console.log(snapshot)

        /**the function in which is passed che snapshot of the collections received from firebase,
         * the function returns the object with data from this snapshot
         */
        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
      }
    );
  }
  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
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
