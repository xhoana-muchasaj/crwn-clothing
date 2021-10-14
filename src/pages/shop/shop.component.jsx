import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    /**
     * trigger the action fetchCollectionsStart
     * the saga is listening to this action
     */
    fetchCollectionsStart();
  },[fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  //dispatches the action
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);

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
      this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        // console.log(snapshot)

        the function in which is passed che snapshot of the collections received from firebase,
         * the function returns the object with data from this snapshot
        
         const collectionsMap = convertCollectionSnapshotToMap(snapshot);
         updateCollections(collectionsMap);
         this.setState({ loading: false });
       }
     );
     */
