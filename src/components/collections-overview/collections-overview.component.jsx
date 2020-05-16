import React from "react";
import { connect } from "react-redux";

import "./collections-overview.style.scss";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selector";
import { createStructuredSelector } from "reselect";

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps}></CollectionPreview>
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
