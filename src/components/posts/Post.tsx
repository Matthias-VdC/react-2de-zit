import { useEffect, useState } from "react";

export default function Post(props: any) {
  console.log(props);
  return (
    <div className="post-container">
      <div className="post-header"></div>
      <div className="post-body">
        {props.data !== undefined && props.data.nr === 1 ? (
          <props.data.body></props.data.body>
        ) : null}
        {props.data !== undefined && props.data.nr === 2 ? (
          <props.data.body></props.data.body>
        ) : null}
      </div>
      <div className="post-footer"></div>
    </div>
  );
}
