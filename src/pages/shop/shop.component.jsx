import React from "react";
import { connect } from "react-redux";
import 
import SHOP_DATA from "./shop.data.js";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

class ShopPage extends React.Component {
  state = {
    collections: SHOP_DATA, // the collection of data for the shop page from the shop.data.js
  };
  render() {
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {
        collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))
        }
      </div>
    );
  }
}

export default ShopPage;
