import { useEffect, useState } from "react";
import Arrow from "../../assets/Arrow";

export default function BodyPost(props: any) {
  const [upvotes, setUpvotes] = useState<any>();
  const [thumbsUpClick, setUpClick] = useState("");
  const [thumbsDownClick, setDownClick] = useState("");
  let data = props.data;
  console.log(data);

  useEffect(() => {
    if (data.ups > 1000) {
      // https://bobbyhadz.com/blog/javascript-round-number-to-1-decimal-place
      setUpvotes((data.ups / 1000).toFixed(1));
    }
  }, [data.ups]);
  if (!data) return <></>;
  if (!data.body) return <></>;
  return (
    <>
      <div className="bodyPost-container">
        <div className="bodyPost-header">
          <img src={data.icon} alt="" />
          <div>
            <div>
              <p>r/{data.subreddit}</p>
            </div>
            <div>
              <p>
                Posted by u/{data.author} • {data.time} ago
              </p>
            </div>
          </div>
        </div>

        <div className="bodyPost-body">
          <data.body data={props}></data.body>
        </div>
        <div className="bodyPost-footer">
          <div className="bodyPost-footer-like-container">
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
            <p>{upvotes}k</p>

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
    </>
  );
}
