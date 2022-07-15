import { useEffect, useState } from "react";

export default function Post(props: any) {
  const data = props;
  // console.log("Post data", data);

  const [a, setA] = useState(data);
  useEffect(() => {
    setA(data);
  }, [a, data, props, setA]);

  return (
    <div className="post-container">
      <div className="post-header">
        {a.data.nr === 1 ? (
          <img className="post-header-icon" src={a.data.icon} alt="" />
        ) : null}
        {a.data.nr === 2 ? (
          <img className="post-header-icon" src={a.data.icon} alt="" />
        ) : null}
        <div>
          <div>
            {a.data.nr === 1 ? <p>r/{a.data.subreddit}</p> : null}
            {a.data.nr === 2 ? <p>r/{a.data.subreddit}</p> : null}
          </div>
          <div>
            {a.data.nr === 1 ? (
              <p>
                Posted by u/{a.data.author} • {a.data.time} ago
              </p>
            ) : null}
            {a.data.nr === 2 ? (
              <p>
                Posted by u/{a.data.author} • {a.data.time} ago
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="post-body">
        {a.data !== undefined && a.data.nr === 1 ? (
          <a.data.body data={data}></a.data.body>
        ) : null}
        {a.data !== undefined && a.data.nr === 2 ? (
          <props.data.body data={data}></props.data.body>
        ) : null}
      </div>
      <div className="post-footer"></div>
    </div>
  );
}
