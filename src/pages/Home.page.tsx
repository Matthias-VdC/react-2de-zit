import { useEffect, useState } from "react";
import Post from "../components/posts/Post";
import fetchData from "../services/RedditService";
import { debounce } from "debounce";
import Body from "../components/Body";

export default function Home() {
  const [scrollState, setScrollState] = useState("scrollIn");
  const [postData, setPostData] = useState<any>();

  useEffect(() => {
    (async function fetchAll() {
      let e = await fetchData(2, 2);
      console.log(e);
      return setPostData(e);
    })();

    window.addEventListener("scroll", () => {
      if (window.pageYOffset !== 0) {
        setScrollState("scrollOut");
      } else {
        setScrollState("scrollIn");
      }
    });
  }, []);
  // https://stackoverflow.com/questions/14807436/difference-between-true-and-false-in-javascript-eventlistener

  return (
    <>
      <div id="home-post-container" className={scrollState}>
        {postData ? <Post data={postData.post1} /> : null}
        {postData ? <Post data={postData.post2} /> : null}
      </div>
      <Body></Body>
    </>
  );
}
