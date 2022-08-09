import { useEffect, useState } from "react";
import Arrow from "../../assets/Arrow";
import Share from "../../assets/share";
import Comment from "../../assets/Comment";
import Dotdotdot from "../Dotdotdot";

export default function BodyPost(props: any) {
  const [upvotes, setUpvotes] = useState<any>();
  const [thumbsUpClick, setUpClick] = useState("");
  const [thumbsDownClick, setDownClick] = useState("");
  const [over18, setOver18] = useState(false);
  let data = props.data;

  useEffect(() => {
    if (data.ups > 1000) {
      // https://bobbyhadz.com/blog/javascript-round-number-to-1-decimal-place
      setUpvotes((data.ups / 1000).toFixed(1));
    }
    if (data.over18) {
      setOver18(true);
    }
  }, [data.over18, data.ups]);
  if (!data) return <></>;
  if (!data.body) return <></>;
  return (
    <>
      <div className="bodyPost-container">
        <div className="bodyPost-header">
          <img src={data.icon} alt="" />
          <div>
            <div>
              <p className="subreddit-text">r/{data.subreddit}</p>
            </div>
            <div>
              <p className="subreddit-user">
                Posted by u/{data.author} • {data.time} ago
              </p>
            </div>
          </div>
          <Dotdotdot />
        </div>

        <div className="bodyPost-body">
          {over18 ? (
            <div style={{ height: "400px" }} className="over18">
              <p>nsfw</p>
            </div>
          ) : (
            <data.body data={props}></data.body>
          )}
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

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
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
