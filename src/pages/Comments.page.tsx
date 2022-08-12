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
    })();
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
  }, [data, id]);

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

    console.log(user);

    if (user.length) {
      // console.log(user, messages);
      let filtered;
      for (let i = 0; i < messages.length; i++) {
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

        row.push(
          <div
            key={messages[i].data.id}
            style={{ marginTop: "24px", width: "100%" }}
          >
            <div style={{ display: "flex" }}>
              <img
                style={{ borderRadius: "100%", width: "50px", height: "50px" }}
                src={filtered}
                alt=""
              />
              <p>{messages[i].data.author}</p>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtml(messages[i].data.body_html),
              }}
            ></div>
          </div>
        );
      }
    }

    return <>{row}</>;
  }

  useEffect(() => {
    (async function test() {
      for (let i = 0; i < messages.length; i++) {
        await fetch(
          `https://www.reddit.com/user/${messages[i].data.author}/about.json`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setUser((prevState: any) => [...prevState, data.data]);
          });
      }
    })();
  }, [fetchUser]);

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
        <MessageBody />
      </div>
    </div>
  );
}
