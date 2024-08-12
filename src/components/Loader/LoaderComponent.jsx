import zoofiLogo from "../../assets/images/logo-new.png";
import "./LoaderComponent.css";

export const LoaderComponent = () => {
  return (
    <>
      <div
        className="single-loader-content" // Use className for styling
      >
        <img src={zoofiLogo} alt="Loading..." width="200" />
      </div>
    </>
  );
};
