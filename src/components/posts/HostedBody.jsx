import React, { useEffect } from "react";

// Disabled ts for this file because html tag properties are annoying to work with when they are always undefined

export default function HostedBody(props) {
  useEffect(() => {

    // https://stackoverflow.com/questions/6433900/syncing-html5-video-with-audio-playback

    var vid = document.getElementById(`video${props.data.data.nr}`);
    var aud = document.getElementById(`audio${props.data.data.nr}`);
    vid.addEventListener("play", (e) => {
      e.preventDefault();
      aud.currentTime = vid.currentTime;
      aud.volume = 0.5;
      aud.play();
    });

    vid.addEventListener("pause", (e) => {
      e.preventDefault();
      aud.currentTime = vid.currentTime;
      aud.pause();
    });

  }, [props.data.data.nr]);

  return (
    <div className="post-body-containers">
      <div>
        <p className="post-body-hosted-title">{props.data.data.title}</p>
        <video
          id={"video" + props.data.data.nr}
          className="post-body-hosted-video"
          src={props.data.data.video}
          controls
        >
          <source src={props.data.data.video} type="video/mp4" />
        </video>
        <audio
          id={"audio" + props.data.data.nr}
          src={props.data.data.audio}
        ></audio>
      </div>
    </div>
  );
}
