import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../services/RedditService";
import icon1 from "../assets/profile-icon/icon1.png";
import icon2 from "../assets/profile-icon/icon2.png";
import icon3 from "../assets/profile-icon/icon3.png";
import icon4 from "../assets/profile-icon/icon4.png";
import icon5 from "../assets/profile-icon/icon5.png";
import icon6 from "../assets/profile-icon/icon6.png";
import icon7 from "../assets/profile-icon/icon7.png";
import icon8 from "../assets/profile-icon/icon8.png";
import icon9 from "../assets/profile-icon/icon9.png";
import icon10 from "../assets/profile-icon/icon10.png";
import icon11 from "../assets/profile-icon/icon11.png";
import image1 from "../assets/subreddit-img/image1.jpg";
import image2 from "../assets/subreddit-img/image2.webp";
import image3 from "../assets/subreddit-img/image3.webp";
import image4 from "../assets/subreddit-img/image4.webp";
import image5 from "../assets/subreddit-img/image5.png";
import image6 from "../assets/subreddit-img/image6.webp";
import image7 from "../assets/subreddit-img/image7.jpg";
import image8 from "../assets/subreddit-img/image8.webp";
import image9 from "../assets/subreddit-img/image9.webp";
import image10 from "../assets/subreddit-img/image10.webp";
import image11 from "../assets/subreddit-img/image11.jpg";
import Arrow from "../assets/Arrow";
import Comment from "../assets/Comment";
import Share from "../assets/share";

export default function Subreddit() {
  let { id } = useParams();
  const [thumbsUpClick, setUpClick] = useState("");
  const [thumbsDownClick, setDownClick] = useState("");

  return (
    <>
      <div className="subreddit-body-container">
        <div className="subreddit-body-container-post">
          <div className="subreddit-body-container-post-header">
            <img src={icon1} alt="" />
            <p>smashing_michael · 5 hr. ago</p>
          </div>
          <div style={{ display: "flex", margin: "18px 0 0 20px" }}>
            <p>Bear is tired of drunks on the beach</p>
          </div>
          <img className="subreddit-body-image" src={image1} alt="" />
          <div className="subreddit-body-like-container">
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
            <p style={{ userSelect: "none" }}>2.2k</p>
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
              transform: "scale(0.6)",
              position: "absolute",
              left: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              width: "50%",
              height: "20%",
            }}
          >
            <Comment />
            <p
              style={{
                transform: "scale(1.2)",
                marginLeft: "12px",
                width: "100%",
              }}
            >
              26 Comments
            </p>
            <Share />
          </div>
        </div>

        <div className="subreddit-body-container-post">
          <div className="subreddit-body-container-post-header">
            <img src={icon2} alt="" />
            <p>smashing_michael · 5 hr. ago</p>
          </div>
          <div style={{ display: "flex", margin: "18px 0 0 20px" }}>
            <p>Bear is tired of drunks on the beach</p>
          </div>
          <img className="subreddit-body-image" src={image2} alt="" />
          <div className="subreddit-body-like-container">
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
            <p style={{ userSelect: "none" }}>2.2k</p>
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
              transform: "scale(0.6)",
              position: "absolute",
              left: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              width: "50%",
              height: "20%",
            }}
          >
            <Comment />
            <p
              style={{
                transform: "scale(1.2)",
                marginLeft: "12px",
                width: "100%",
              }}
            >
              26 Comments
            </p>
            <Share />
          </div>
        </div>
        <div className="subreddit-body-container-post">
          <div className="subreddit-body-container-post-header">
            <img src={icon3} alt="" />
            <p>smashing_michael · 5 hr. ago</p>
          </div>
          <div style={{ display: "flex", margin: "18px 0 0 20px" }}>
            <p>Bear is tired of drunks on the beach</p>
          </div>
          <img className="subreddit-body-image" src={image3} alt="" />
          <div className="subreddit-body-like-container">
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
            <p style={{ userSelect: "none" }}>2.2k</p>
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
              transform: "scale(0.6)",
              position: "absolute",
              left: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              width: "50%",
              height: "20%",
            }}
          >
            <Comment />
            <p
              style={{
                transform: "scale(1.2)",
                marginLeft: "12px",
                width: "100%",
              }}
            >
              26 Comments
            </p>
            <Share />
          </div>
        </div>
        <div className="subreddit-body-container-post">
          <div className="subreddit-body-container-post-header">
            <img src={icon4} alt="" />
            <p>smashing_michael · 5 hr. ago</p>
          </div>
          <div style={{ display: "flex", margin: "18px 0 0 20px" }}>
            <p>Bear is tired of drunks on the beach</p>
          </div>
          <img className="subreddit-body-image" src={image4} alt="" />
          <div className="subreddit-body-like-container">
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
            <p style={{ userSelect: "none" }}>2.2k</p>
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
              transform: "scale(0.6)",
              position: "absolute",
              left: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              width: "50%",
              height: "20%",
            }}
          >
            <Comment />
            <p
              style={{
                transform: "scale(1.2)",
                marginLeft: "12px",
                width: "100%",
              }}
            >
              26 Comments
            </p>
            <Share />
          </div>
        </div>
        <div className="subreddit-body-container-post">
          <div className="subreddit-body-container-post-header">
            <img src={icon5} alt="" />
            <p>smashing_michael · 5 hr. ago</p>
          </div>
          <div style={{ display: "flex", margin: "18px 0 0 20px" }}>
            <p>Bear is tired of drunks on the beach</p>
          </div>
          <img className="subreddit-body-image" src={image5} alt="" />
          <div className="subreddit-body-like-container">
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
            <p style={{ userSelect: "none" }}>2.2k</p>
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
              transform: "scale(0.6)",
              position: "absolute",
              left: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              width: "50%",
              height: "20%",
            }}
          >
            <Comment />
            <p
              style={{
                transform: "scale(1.2)",
                marginLeft: "12px",
                width: "100%",
              }}
            >
              26 Comments
            </p>
            <Share />
          </div>
        </div>
        <div className="subreddit-body-container-post">
          <div className="subreddit-body-container-post-header">
            <img src={icon6} alt="" />
            <p>smashing_michael · 5 hr. ago</p>
          </div>
          <div style={{ display: "flex", margin: "18px 0 0 20px" }}>
            <p>Bear is tired of drunks on the beach</p>
          </div>
          <img className="subreddit-body-image" src={image6} alt="" />
          <div className="subreddit-body-like-container">
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
            <p style={{ userSelect: "none" }}>2.2k</p>
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
              transform: "scale(0.6)",
              position: "absolute",
              left: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              width: "50%",
              height: "20%",
            }}
          >
            <Comment />
            <p
              style={{
                transform: "scale(1.2)",
                marginLeft: "12px",
                width: "100%",
              }}
            >
              26 Comments
            </p>
            <Share />
          </div>
        </div>
        <div className="subreddit-body-container-post">
          <div className="subreddit-body-container-post-header">
            <img src={icon7} alt="" />
            <p>smashing_michael · 5 hr. ago</p>
          </div>
          <div style={{ display: "flex", margin: "18px 0 0 20px" }}>
            <p>Bear is tired of drunks on the beach</p>
          </div>
          <img className="subreddit-body-image" src={image7} alt="" />
          <div className="subreddit-body-like-container">
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
            <p style={{ userSelect: "none" }}>2.2k</p>
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
              transform: "scale(0.6)",
              position: "absolute",
              left: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              width: "50%",
              height: "20%",
            }}
          >
            <Comment />
            <p
              style={{
                transform: "scale(1.2)",
                marginLeft: "12px",
                width: "100%",
              }}
            >
              26 Comments
            </p>
            <Share />
          </div>
        </div>
        <div className="subreddit-body-container-post">
          <div className="subreddit-body-container-post-header">
            <img src={icon8} alt="" />
            <p>smashing_michael · 5 hr. ago</p>
          </div>
          <div style={{ display: "flex", margin: "18px 0 0 20px" }}>
            <p>Bear is tired of drunks on the beach</p>
          </div>
          <img className="subreddit-body-image" src={image8} alt="" />
          <div className="subreddit-body-like-container">
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
            <p style={{ userSelect: "none" }}>2.2k</p>
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
              transform: "scale(0.6)",
              position: "absolute",
              left: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              width: "50%",
              height: "20%",
            }}
          >
            <Comment />
            <p
              style={{
                transform: "scale(1.2)",
                marginLeft: "12px",
                width: "100%",
              }}
            >
              26 Comments
            </p>
            <Share />
          </div>
        </div>
        <div className="subreddit-body-container-post">
          <div className="subreddit-body-container-post-header">
            <img src={icon9} alt="" />
            <p>smashing_michael · 5 hr. ago</p>
          </div>
          <div style={{ display: "flex", margin: "18px 0 0 20px" }}>
            <p>Bear is tired of drunks on the beach</p>
          </div>
          <img className="subreddit-body-image" src={image9} alt="" />
          <div className="subreddit-body-like-container">
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
            <p style={{ userSelect: "none" }}>2.2k</p>
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
              transform: "scale(0.6)",
              position: "absolute",
              left: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              width: "50%",
              height: "20%",
            }}
          >
            <Comment />
            <p
              style={{
                transform: "scale(1.2)",
                marginLeft: "12px",
                width: "100%",
              }}
            >
              26 Comments
            </p>
            <Share />
          </div>
        </div>
      </div>
    </>
  );
}
