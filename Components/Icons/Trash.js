import * as React from "react";

function Trash(props) {
  return (
    <svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="trash-alt"
      className="prefix__svg-inline--fa prefix__fa-trash-alt prefix__fa-w-14"
      viewBox="0 0 448 512"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M32 464a48 48 0 0048 48h288a48 48 0 0048-48V128H32zm272-256a16 16 0 0132 0v224a16 16 0 01-32 0zm-96 0a16 16 0 0132 0v224a16 16 0 01-32 0zm-96 0a16 16 0 0132 0v224a16 16 0 01-32 0zM432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.8a23.72 23.72 0 00-21.4 13.3L136 32H16A16 16 0 000 48v32a16 16 0 0016 16h416a16 16 0 0016-16V48a16 16 0 00-16-16z"
      />
    </svg>
  );
}

const MemoTrash = React.memo(Trash);
export default MemoTrash;
