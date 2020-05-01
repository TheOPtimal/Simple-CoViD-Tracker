import React from "react";
import "./Loading.css";

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

export default function Loading({ visibility }: { visibility: boolean }) {
  if (visibility)
    return (
      <div className="modal-bg">
        <div className="modal-box">
          <span className="modal-text">Loading...</span>
          <Spinner />
        </div>
      </div>
    );
  else return <></>;
}
