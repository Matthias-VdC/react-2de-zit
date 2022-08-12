import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Arrow from "../assets/Arrow";
import Dotdotdot from "../components/Dotdotdot";
import fetchData from "../services/RedditService";
import Comment from "../assets/Comment";
import defaultLogo from "../assets/subreddit-default.png";

export default function Comments() {
  // https://v5.reactrouter.com/web/example/url-params
  let { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [thumbsUpClick, setUpClick] = useState("");
  const [thumbsDownClick, setDownClick] = useState("");
  const [upvotes, setUpvotes] = useState<any>();
  const [user, setUser] = useState<any>([]);
  const [fetchUser, setFetchUser] = useState<any>(false);
  const [fetchComments, setFetchComments] = useState<any>(false);

  useEffect(() => {
    // Fix eventlisteners on html tag persisting through pages
    // https://www.codegrepper.com/code-examples/javascript/javascript+window.location.reload+only+once+in+react
    if (!window.location.hash) {
      // @ts-ignore: Unreachable code error
      window.location = window.location + "#loaded";
      window.location.reload();
    }
    window.scrollTo(0, 0);
    (async function fetcher() {
      const postFetch = await fetchData(1, 1, undefined, 1, id);
      setData(postFetch);
    })().finally(() => {
      setFetchComments(true);
    });
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.post1.ups > 1000) {
        // https://bobbyhadz.com/blog/javascript-round-number-to-1-decimal-place
        setUpvotes((data.post1.ups / 1000).toFixed(1));
      }
      (async function fetchComments() {
        await fetch(`https://www.reddit.com/${id}/.json`)
          .then((response) => response.json())
          .then((data) => {
            setMessages(data[1].data.children);
          })
          .finally(() => {
            setFetchUser(true);
          });
      })();
    }
  }, [fetchComments]);

  useEffect(() => {
    (async function test() {
      for (let i = 0; i < messages.length; i++) {
        await fetch(
          `https://www.reddit.com/user/${messages[i].data.author}/about.json`
        )
          .then((response) => response.json())
          // eslint-disable-next-line no-loop-func
          .then((data) => {
            setUser((prevState: any) => [...prevState, data.data]);
          });
      }
    })();
  }, [fetchUser]);

  function decodeHtml(html: any) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    let newValue = txt.value.replace(/(.*?<!-- SC_OFF -->)/, "");
    newValue = newValue.replace(/(.*?<!-- SC_ON -->)/, "");
    let removeComma = newValue.replace(/(?<=\>)(,)(?=\<)/gm, "");
    return removeComma;
  }

  function MessageBody() {
    const row: JSX.Element[] = [];

    let filtered;
    for (let i = 0; i < messages.length - 1; i++) {
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

      row.push(
        <div className="single-commment-container" key={messages[i].data.id}>
          <div className="single-comment-likes-container">
            <Arrow
              onClick={(e: any) => {
                if (e.currentTarget.style.stroke !== "rgb(230, 90, 90)") {
                  e.currentTarget.style.fill = "rgb(230, 90, 90)";
                  e.currentTarget.style.stroke = "rgb(230, 90, 90)";
                  ups = ups + 1;
                } else {
                  e.currentTarget.style.fill = "transparent";
                  e.currentTarget.style.stroke = "rgb(50, 50, 50)";
                  ups = ups - 1;
                }
              }}
              styling="single-comment-like single-comment-arrows"
            />
            <p>
              {ups}
              {isOver ? <span>k</span> : null}
            </p>
            <Arrow
              onClick={(e: any) => {
                if (e.currentTarget.style.stroke !== "rgb(230, 90, 90)") {
                  e.currentTarget.style.fill = "rgb(230, 90, 90)";
                  e.currentTarget.style.stroke = "rgb(230, 90, 90)";
                  ups = ups + 1;
                } else {
                  e.currentTarget.style.fill = "transparent";
                  e.currentTarget.style.stroke = "rgb(50, 50, 50)";
                  ups = ups - 1;
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
          </div>
        </div>
      );
    }

    // console.log(user.length, row.length, messages.length);
    // https://stackoverflow.com/questions/26568536/remove-all-items-after-an-index
    row.length = user.length;
    return <>{row}</>;
  }

  if (!data) return null;
  if (!data.post1.body) return null;

  return (
    <div className="comments-page">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: "-999999999",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      ></div>
      <div className="comments-page-container">
        <div className="comments-page-header-sticky">
          <div className="comments-footer-like-container">
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
            <p style={{ userSelect: "none" }}>{upvotes}k</p>
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
          <button
            onClick={() => {
              navigate("/", { replace: true });
            }}
          >
            close
          </button>
        </div>
        <div
          style={{
            backgroundColor: "transparent",
            width: "100%",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            marginBottom: "20px",
          }}
          className="bodyPost-header"
        >
          <img src={data.post1.icon} alt="" />
          <div>
            <div>
              <p className="subreddit-text">r/{data.post1.subreddit}</p>
            </div>
            <div>
              <p className="subreddit-user">
                Posted by u/{data.post1.author} • {data.post1.time} ago
              </p>
            </div>
          </div>
        </div>
        <data.post1.body data={{ data: data.post1 }}></data.post1.body>
        <div className="message-body-container">
          <MessageBody />
        </div>
      </div>
    </div>
  );
}
