import { useEffect, useRef, useState } from "react";
import Post from "../components/posts/Post";
import fetchData from "../services/RedditService";
import Body from "../components/Body";

export default function Home() {
  const [scrollState, setScrollState] = useState("scrollIn");
  const [scrollStateBody, setScrollStateBody] = useState("scrollOut");
  const [postData, setPostData] = useState<any>(null);
  const [postList, setPostList] = useState<any>([]);

  useEffect(() => {
    (async function fetch() {
      try {
        const response = await fetchData(2, 2);
        console.log("response", response);
        setPostData(response);
      } catch (e) {
        console.error(e);
      }
    })();

    window.addEventListener("scroll", () => {
      if (window.pageYOffset !== 0) {
        setScrollState("scrollOut");
        setScrollStateBody("scrollInBody");
      } else {
        setScrollState("scrollIn");
        setScrollStateBody("scrollOutBody");
      }
    });
  }, []);
  // Empty array makes it so that useEffect triggers only on first page mount

  useEffect(() => {
    setPostList([]);
    for (const key in postData) {
      // https://bobbyhadz.com/blog/react-push-to-state-array
      setPostList((current: any) => [
        ...current,
        <Post data={postData[key]} key={key} />,
      ]);
    }
  }, [postData]);
  // Update on every change of postData

  if (!postData) return null;

  return (
    <>
      <div id="home-post-container" className={scrollState}>
        {postList}
      </div>
      <Body className={scrollStateBody}></Body>
    </>
  );
}
