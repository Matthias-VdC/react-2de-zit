import { useEffect, useState } from "react";
import Arrow from "../../assets/Arrow";
import Share from "../../assets/share";
import Comment from "../../assets/Comment";
import Dotdotdot from "../Dotdotdot";

let rows = [];

export default function Post(props: any) {
  const [thumbsUpClick, setUpClick] = useState("");
  const [thumbsDownClick, setDownClick] = useState("");
  const [data, setData] = useState<any>();
  const [upvotes, setUpvotes] = useState<any>();

  useEffect(() => {
    (async function getData() {
      setData(await props);

      if (!data) return null;
      if (!data.data) return null;
      if (data.data.ups > 1000) {
        // https://bobbyhadz.com/blog/javascript-round-number-to-1-decimal-place
        setUpvotes((data.data.ups / 1000).toFixed(1));
      }
    })();
  }, [data, props]);

  if (!data) return null;
  if (!data.data) return null;
  if (!data.data.body) return null;

  return (
    <>
      <div className="post-container">
        <div className="post-header">
          <img className="post-header-icon" src={data.data.icon} alt="" />
          <div>
            <div>
              <p className="subreddit-text">r/{data.data.subreddit}</p>
            </div>
            <div>
              <p className="subreddit-user">
                Posted by u/{data.data.author} • {data.data.time} ago
              </p>
            </div>
          </div>
          <Dotdotdot />
        </div>
        <div className="post-body">
          <data.data.body data={data}></data.data.body>
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

          <div
            style={{
              position: "relative",
              display: "flex",
              marginRight: "3%",
            }}
          >
            {/* https://www.w3schools.com/css/css_tooltip.asp */}
            <div style={{ position: "relative" }}>
              <div className="tooltip">
                <p className="tooltiptext">Share post</p>
              </div>
              <Share />
            </div>

            <div style={{ position: "relative" }}>
              <div className="tooltip">
                <p className="tooltiptext">Comment</p>
              </div>
              <Comment />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
