import React, { useEffect, useState } from "react";

// Disabled ts for this file because html tag properties are annoying to work with when they are always undefined

export default function HostedBody(props) {
  const [audio, setAudio] = useState(true);
  const [videoControls, setVideoControls] = useState(true);

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


      aud.addEventListener("play", (e) => {
        e.preventDefault();
        vid.currentTime = aud.currentTime;
        vid.play();
      });

      aud.addEventListener("pause", (e) => {
        e.preventDefault();
        vid.currentTime = aud.currentTime;
        vid.pause();
      });

  }, [props.data.data.nr]);

  return (
    <div className="post-body-containers">
      <div>
        <p className="post-body-hosted-title">{props.data.data.title.replace(/ &amp; /gm, ". ")}</p>
        <video
          id={"video" + props.data.data.nr}
          className="post-body-hosted-video"
          src={props.data.data.video}
          controls
        >
          <source src={props.data.data.video} type="video/mp4" />
        </video>
        <div className="audio-controls-container">
          <audio
            id={"audio" + props.data.data.nr}
            className='audio-controls'
            src={props.data.data.audio}
          ></audio>
        </div>
      </div>
    </div>
  );
}
