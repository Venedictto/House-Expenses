import * as React from "react";

function MaleSolid(props) {
  return (
    <svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="male"
      className="prefix__svg-inline--fa prefix__fa-male prefix__fa-w-6"
      viewBox="0 0 192 512"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M96 0c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64S60.654 0 96 0m48 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H48c-26.51 0-48 21.49-48 48v136c0 13.255 10.745 24 24 24h16v136c0 13.255 10.745 24 24 24h64c13.255 0 24-10.745 24-24V352h16c13.255 0 24-10.745 24-24V192c0-26.51-21.49-48-48-48z"
      />
    </svg>
  );
}

const MemoMaleSolid = React.memo(MaleSolid);
export default MemoMaleSolid;
