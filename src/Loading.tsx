import React from "react";
import "./Loading.css";

// eslint-disable-next-line
function Spinner() {
  return (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default function Loading({
  visibility,
  setModalVisibility,
}: {
  visibility: boolean;
  setModalVisibility: (arg0: boolean) => any;
}) {
  if (visibility)
    return (
      <div className="modal-bg">
        <div className="modal-box">
          <span className="modal-close" onClick={() => setModalVisibility(false)}>
            <i className="gg-close"></i>
          </span>
          <span className="modal-text">
            Looks like the hourly quota has been reached. Come back in an hour!
          </span>
          {/* <Spinner /> */}
        </div>
      </div>
    );
  else return <></>;
}
