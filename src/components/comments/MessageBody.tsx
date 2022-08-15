import { useEffect, useState } from "react";
import Arrow from "../../assets/Arrow";
import defaultLogo from "../../assets/subreddit-default.png";
import Comment from "../../assets/Comment";

export default function MessageBody(props: any) {
  const [i, setI] = useState(props.i);
  const [user, setUser] = useState(props.user);
  const [messages, setMessages] = useState(props.messages);
  const [thumbsUpClick, setUpClick] = useState("");
  const [thumbsDownClick, setDownClick] = useState("");

  useEffect(() => {
    setI(props.i);
    setUser(props.user);
    setMessages(props.messages);
  }, [props.i, props.messages, props.user]);

  if (!user[i] || !messages[i]) return null;

  function decodeHtml(html: any) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    let newValue = txt.value.replace(/(.*?<!-- SC_OFF -->)/, "");
    newValue = newValue.replace(/(.*?<!-- SC_ON -->)/, "");
    let removeComma = newValue.replace(/(?<=\>)(,)(?=\<)/gm, "");
    return removeComma;
  }

  let filtered;
  if (user[i]) {
    if (user[i].icon_img) {
      filtered = user[i].icon_img;
      filtered = filtered.replace(/\bamp;\b/gm, "");
    } else if (user[i].snoovatar_img) {
      filtered = user[i].snoovatar_img;
    } else {
      filtered = defaultLogo;
    }
  }

  const dateNow = new Date();
  // https://stackoverflow.com/questions/44861119/convert-reddits-created-unix-timestamp-to-readable-date
  let datePost = new Date(messages[i].data.created * 1000);
  let seconds = Math.floor((datePost.getTime() - dateNow.getTime()) / 1000);
  // https://stackoverflow.com/questions/4652104/convert-a-negative-number-to-a-positive-one-in-javascript
  seconds = Math.abs(seconds);
  let timeDifference = "";

  if (seconds < 60) {
    timeDifference = `${seconds} seconds`;
  } else if (seconds > 60 && seconds < 3600) {
    // https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
    timeDifference = `${Math.floor((seconds % 3600) / 60)} minutes`;
  } else if (seconds > 3600 && seconds < 86400) {
    timeDifference = `${Math.floor(seconds / 3600)} hours`;
  } else if (seconds > 86400 && seconds < 2629743.83) {
    timeDifference = `${Math.floor(seconds / (3600 * 24))} days`;
  } else if (seconds > 2629743.83 && seconds < 31556926) {
    timeDifference = `${Math.floor(seconds / (3600 * 24) / 30)} months`;
  } else {
    timeDifference = `${Math.floor(seconds / (3600 * 24) / 30 / 12)} years`;
  }
  let ups: number;
  let isOver = false;
  if (messages[i].data.ups > 1000) {
    // @ts-ignore: Unreachable code error
    ups = (messages[i].data.ups / 1000).toFixed(1);
    isOver = true;
  } else {
    ups = messages[i].data.ups;
    isOver = false;
  }

  return (
    <div className="single-commment-container">
      <div className="single-comment-likes-container">
        <Arrow
          clickValue={thumbsUpClick}
          onClick={() => {
            if (thumbsDownClick) {
              setUpClick("message-upClick");
              setDownClick("");
            } else if (!thumbsDownClick && !thumbsUpClick) {
              setUpClick("message-upClick");
            } else {
              setDownClick("");
              setUpClick("");
            }
          }}
          styling="single-comment-like single-comment-arrows"
        />
        <p>
          {ups}
          {isOver ? <span>k</span> : null}
        </p>
        <Arrow
          clickValue={thumbsDownClick}
          onClick={() => {
            if (thumbsUpClick) {
              setDownClick("message-downClick");
              setUpClick("");
            } else if (!thumbsDownClick && !thumbsUpClick) {
              setDownClick("message-downClick");
            } else {
              setDownClick("");
              setUpClick("");
            }
          }}
          styling="single-comment-dislike single-comment-arrows"
        />
      </div>
      <div>
        <div className="comments-header-container">
          <img src={filtered} alt="" />
          <p>{messages[i].data.author} </p>
          <span style={{ color: "rgb(150, 150, 150)" }}>
            • {timeDifference}
          </span>
        </div>
        <div
          className="single-comment-body"
          dangerouslySetInnerHTML={{
            __html: decodeHtml(messages[i].data.body_html),
          }}
        ></div>
        <div
          style={{
            transform: "scale(0.8)",
            display: "flex",
            alignItems: "center",
            marginBottom: "14px",
            marginLeft: "-8%",
          }}
        >
          <Comment />
          <p>{Math.floor(Math.random() * 6)} Comments</p>
        </div>
      </div>
    </div>
  );
}
