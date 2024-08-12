export const CustomSvg = ({ svgName }) => {
  // order-icon
  if (svgName === "order-icon") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="20"
        height="20"
        x="0"
        y="0"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        className=""
      >
        <g>
          <path
            fillRule="evenodd"
            d="m210.904 54.881 63.137 24.55-188.498 73.296-66.039-25.679 185.602-72.167c1.937-.755 3.859-.755 5.798 0zm196.604 210.815c53.016 0 95.992 42.979 95.992 95.995s-42.977 95.994-95.992 95.994-95.996-42.978-95.996-95.994 42.98-95.995 95.996-95.995zm36.347 52.219-56.865 56.864-19.404-24.421c-4.773-6.004-13.512-7.002-19.516-2.229-6.006 4.773-7.004 13.511-2.23 19.516l28.559 35.936c4.938 7.074 15.105 8.042 21.258 1.888l67.875-67.876c5.436-5.434 5.436-14.244 0-19.678-5.434-5.434-14.243-5.434-19.677 0zM341.461 105.646c-62.832 24.434-125.664 48.867-188.5 73.295l55.043 21.402 188.5-73.295zm66.047 34.234-191.504 74.463v221.811l87.1-33.867c-4.898-12.586-7.59-26.275-7.59-40.596 0-61.852 50.141-111.993 111.994-111.993zM200.004 436.153v-221.81l-58.043-22.568v46.838c0 2.264-2.645 3.486-4.367 2.018l-30.805-26.236-28.809 8.959a2.642 2.642 0 0 1-3.438-2.529V165.56L8.5 139.881v216.336c0 3.367 1.965 6.238 5.104 7.458z"
            clipRule="evenodd"
            fill="#000000"
            opacity="1"
            data-original="#000000"
          ></path>
        </g>
      </svg>
    );
  }
  // forward-icon
  else if (svgName === "forward-icon") {
    return (
      <svg
        width="16"
        height="27"
        viewBox="0 0 16 27"
        xmlns="http://www.w3.org/2000/svg"
        className="HQ6J2h"
      >
        <path
          d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z"
          fill="#9F9F9F"
        ></path>
      </svg>
    );
  }
  // profile-icon
  else if (svgName === "profile-icon") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="20"
        height="20"
        x="0"
        y="0"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
        className=""
      >
        <g>
          <circle
            cx="16"
            cy="8"
            r="7"
            fill="#000000"
            opacity="1"
            data-original="#000000"
          ></circle>
          <path
            d="M20.97 17h-9.94A8.04 8.04 0 0 0 3 25.03V30a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1v-4.97A8.04 8.04 0 0 0 20.97 17z"
            fill="#000000"
            opacity="1"
            data-original="#000000"
          ></path>
        </g>
      </svg>
    );
  }
  // return null if there is no match
  else return null;
};
