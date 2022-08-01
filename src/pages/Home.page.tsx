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
    let root = document.getElementById("root");

    (async function fetch() {
      try {
        const response = await fetchData(2, 2, "body");
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
      // if (window.innerHeight + window.scrollY >= root!.offsetHeight) {
      //   // you're at the bottom of the page
      //   setBodyData((current: any) => [
      //     ...current,
      //     <Body className={scrollStateBody} />,
      //   ]);
      //   document.body.scrollTo(0, 200);
      //   root = document.getElementById("root");
      // }
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

  useEffect(() => {}, [bodyData]);

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
