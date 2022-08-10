import { useCallback, useEffect, useState } from "react";
import Arrow from "../../assets/Arrow";
import Share from "../../assets/share";
import Comment from "../../assets/Comment";
import Dotdotdot from "../Dotdotdot";
import { relative } from "path";
import { useNavigate } from "react-router-dom";

export default function BodyPost(props: any) {
  const [upvotes, setUpvotes] = useState<any>();
  const [thumbsUpClick, setUpClick] = useState("");
  const [thumbsDownClick, setDownClick] = useState("");
  const [over18, setOver18] = useState(false);
  const [buttonDownTime, setButtonDownTime] = useState<any>(0);
  let data = props.data;

  // https://stackoverflow.com/questions/29244731/react-router-how-to-manually-invoke-link
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("/post/" + data.id, { replace: true }),
    [navigate]
  );

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

        <div
          className="bodyPost-body"
          onClick={async () => {
            await handleOnClick();
          }}
        >
          {over18 ? (
            <div style={{ position: "relative" }}>
              <div
                style={{
                  height: "400px",
                  filter: "blur(30px)",
                  position: "relative",
                }}
                className="over18"
              >
                <data.body data={props}></data.body>
              </div>
              <p
                className="show-nsfw"
                onMouseDown={(e) => {
                  setButtonDownTime(e.timeStamp);
                }}
                onMouseUp={(e) => {
                  let duration = (buttonDownTime - e.timeStamp) / 1000;
                  duration = duration * -1;
                  console.log(duration);
                  if (duration > 0.8) {
                    // @ts-ignore: Unreachable code error
                    e.currentTarget.parentNode.firstElementChild.style.filter =
                      "";
                    e.currentTarget.style.display = "none";
                  }
                  setButtonDownTime(0);
                }}
              >
                Hold to show NSFW
              </p>
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
