import zoofiLogo from "../../assets/images/logo-new.png";
import "./FullPageLoader.css";

export const FullPageLoader = () => {
  return (
    <>
      <div
        className="loader-container" // Use className for styling
      >
        <div
          className="loader-content" // Use className for styling
        >
          <img src={zoofiLogo} alt="Loading..." width={"100%"} />
        </div>
      </div>
    </>
  );
};
