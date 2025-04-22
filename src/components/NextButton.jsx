import React from "react";

function NextButton({ onClick }) {
  return (
    <button className={`playBtn mt-2`} onClick={onClick}>
      P L A Y
      <div id="clip">
        <div id="leftTop" class="corner"></div>
        <div id="rightBottom" class="corner"></div>
        <div id="rightTop" class="corner"></div>
        <div id="leftBottom" class="corner"></div>
      </div>
      <span id="rightArrow" class="arrow"></span>
      <span id="leftArrow" class="arrow"></span>
    </button>
  );
}

export default NextButton;
