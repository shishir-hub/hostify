import "./ItemSkeleton.scss";

const ItemSkeleton = ({ style = "" }: { style?: string }) => {
  return (
    <div className={`property-item-wrapper ${style}`}>
      <div className="like-button-wrapper skeleton-circle" />

      <div className="property-item skeleton-card">
        <div className="image-container">
          <div className="skeleton skeleton-image" />
        </div>

        <div className="item-contents">
          <div className="upper">
            <div className="name-loc">
              <div className="skeleton skeleton-text title" />
              <div className="skeleton skeleton-text subtitle" />
            </div>

            <div className="ratings">
              <div className="skeleton skeleton-text rating" />
              <div className="skeleton skeleton-star" />
            </div>
          </div>

          <div className="skeleton skeleton-text price" />
        </div>
      </div>
    </div>
  );
};

export default ItemSkeleton;
