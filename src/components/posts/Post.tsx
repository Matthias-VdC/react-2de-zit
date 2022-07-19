import { useEffect, useState } from "react";
import Arrow from "../../assets/Arrow";

export default function Post(props: any) {
  const [thumbsUpClick, setUpClick] = useState("");
  const [thumbsDownClick, setDownClick] = useState("");
  // console.log("Post data", data);

  const [data, setData] = useState<any>();

  useEffect(() => {
    (async function getData() {
      setData(await props);
    })();
  }, [props]);

  return (
    <>
      {data ? (
        <div className="post-container">
          <div className="post-header">
            {data.data.nr === 1 ? (
              <img className="post-header-icon" src={data.data.icon} alt="" />
            ) : null}
            {data.data.nr === 2 ? (
              <img className="post-header-icon" src={data.data.icon} alt="" />
            ) : null}
            <div>
              <div>
                {data.data.nr === 1 ? <p>r/{data.data.subreddit}</p> : null}
                {data.data.nr === 2 ? <p>r/{data.data.subreddit}</p> : null}
              </div>
              <div>
                {data.data.nr === 1 ? (
                  <p>
                    Posted by u/{data.data.author} • {data.data.time} ago
                  </p>
                ) : null}
                {data.data.nr === 2 ? (
                  <p>
                    Posted by u/{data.data.author} • {data.data.time} ago
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="post-body">
            {data.data !== undefined && data.data.nr === 1 ? (
              <data.data.body data={data}></data.data.body>
            ) : null}
            {data.data !== undefined && data.data.nr === 2 ? (
              <data.data.body data={data}></data.data.body>
            ) : null}
          </div>
          <div className="post-footer">
            <div className="post-footer-like-container">
              <Arrow
                clickValue={thumbsUpClick}
                onClick={() => {
                  if (thumbsDownClick) {
                    setUpClick("thumbsUpClick");
                    setDownClick("");
                  } else if (!thumbsDownClick && !thumbsUpClick) {
                    setUpClick("thumbsUpClick");
                  } else {
                    setDownClick("");
                    setUpClick("");
                  }
                }}
                styling="thumbsUp"
              />
              <p>{data.data.ups}</p>
              <Arrow
                clickValue={thumbsDownClick}
                onClick={() => {
                  if (thumbsUpClick) {
                    setDownClick("thumbsDownClick");
                    setUpClick("");
                  } else if (!thumbsDownClick && !thumbsUpClick) {
                    setDownClick("thumbsDownClick");
                  } else {
                    setDownClick("");
                    setUpClick("");
                  }
                }}
                styling="thumbsDown"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
