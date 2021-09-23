import React from "react";
import CollectionItem from "../../components/collection-item/collection-item.component";

import "./collection.styles.scss";

const CollectionPage = ({ match }) => {
  console.log("collectionId", match.params.collectionId);
  return (
    <div className="collection-page">
      <h2>CATEGORY PAGE</h2>
    </div>
  );
};

export default CollectionPage;
