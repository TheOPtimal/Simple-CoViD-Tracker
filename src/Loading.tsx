import React from "react";
import "./Loading.css";
import "react-transition-group";
import { CSSTransition } from "react-transition-group";

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
}: {
  visibility: boolean;
}) {
  return (
    <CSSTransition in={visibility === true} timeout={200} classNames="modal-primary" unmountOnExit>
      <div className="modal-bg">
        <div className="modal-box">
          <span className="modal-text">
            Looks like the hourly quota has been reached. Come back in an hour!
          </span>
          {/* <Spinner /> */}
        </div>
      </div>
    </CSSTransition>
  );
}
