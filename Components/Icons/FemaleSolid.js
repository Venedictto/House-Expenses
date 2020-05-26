import * as React from "react";

function FemaleSolid(props) {
  return (
    <svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="female"
      className="prefix__svg-inline--fa prefix__fa-female prefix__fa-w-8"
      viewBox="0 0 256 512"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M128 0c35.346 0 64 28.654 64 64s-28.654 64-64 64c-35.346 0-64-28.654-64-64S92.654 0 128 0m119.283 354.179l-48-192A24 24 0 00176 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H80a24 24 0 00-23.283 18.179l-48 192C4.935 369.305 16.383 384 32 384h56v104c0 13.255 10.745 24 24 24h32c13.255 0 24-10.745 24-24V384h56c15.591 0 27.071-14.671 23.283-29.821z"
      />
    </svg>
  );
}

const MemoFemaleSolid = React.memo(FemaleSolid);
export default MemoFemaleSolid;
