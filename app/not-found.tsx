import Link from "next/link";
import "./NotFound.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container-wrapper">
        <p>
          This section is either in the development phase or doesnot exists.
        </p>
        <p className="title">
          You can checkout our <Link href={"/"}>listings</Link> right now.
        </p>
        <span>Thankyou for your Patience.</span>
      </div>
    </div>
  );
};

export default NotFoundPage;
