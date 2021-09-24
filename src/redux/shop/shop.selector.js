import { createSelector } from "reselect";

// in case of data array
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   women: 4,
//   men: 5,
// };

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);
// FIND COLLECTION_ID_MAP.ID MATCHING THE URL PARAMETER OF OUR COLLECTION ID MAP
export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]

    /** when the data was saved as array
   * collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    ) 
     */
  );
