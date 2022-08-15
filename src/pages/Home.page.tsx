import { useEffect, useRef, useState } from "react";
import Post from "../components/headerPosts/Post";
import fetchData from "../services/RedditService";
import Body from "../components/Body";

export default function Home() {
  const [scrollState, setScrollState] = useState("scrollIn");
  const [scrollStateBody, setScrollStateBody] = useState("scrollOut");
  const [postData, setPostData] = useState<any>(null);
  const [postList, setPostList] = useState<any>([]);
  const [bodyData, setBodyData] = useState<any>([]);

  useEffect(() => {
    (async function fetch() {
      try {
        // undefined wrong but works so I won't bother to fix it until it becomes a problem :)
        const response = await fetchData(2, 2, undefined, undefined, false);
        console.log("response", response);
        setPostData(response);
      } catch (e) {
        console.error(e);
      }
    })();

    document.addEventListener("scroll", () => {
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
      <Body className={scrollStateBody} />
    </>
  );
}
