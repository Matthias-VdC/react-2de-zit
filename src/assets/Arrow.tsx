import { useEffect, useRef, useState } from "react";

export default function Arrow(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36.039"
      height="37.5"
      viewBox="0 0 36.039 37.5"
      className={`${props.styling} thumbs ${props.clickValue}`}
      onClick={props.onClick}
    >
      <path
        d="M21.437,0h-9.89a2.142,2.142,0,0,0-2.07,2.3V14.8H1.656A1.59,1.59,0,0,0,.092,15.9,4,4,0,0,0,0,16.5a1.86,1.86,0,0,0,.46,1.3l14.9,16.153a1.487,1.487,0,0,0,2.3,0L32.523,17.8a1.788,1.788,0,0,0-1.2-3H23.461V2.3A2.108,2.108,0,0,0,21.437,0Z"
        transform="translate(34.539 36) rotate(180)"
      />
    </svg>
  );
}
