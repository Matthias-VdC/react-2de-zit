import { useEffect, useState } from "react";
import Post from "../components/posts/Post";
import fetchData from "../services/RedditService";

export default function Home() {
  const [scrollState, setScrollState] = useState("scrollIn");
  const [postData, setPostData] = useState<any>();
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    fetchData(prevPage, nextPage, false).then((d) => {
      setPostData(d);
    });
    window.addEventListener("scroll", (e) => {
      if (window.scrollY === 0 && window.screen.height > 1000) {
        setPage(1);
        setScrollState("scrollIn");
      } else if (
        window.screen.height < 1000 &&
        window.scrollY < window.screen.height / 3
      ) {
        setScrollState("scrollIn");
      } else {
        setScrollState("scrollOut");
      }
    });
  }, [nextPage, prevPage]);

  return (
    <>
      <div id="home-post-container" className={scrollState}>
        {postData !== undefined ? <Post data={postData!.post1} /> : null}
        {postData !== undefined ? <Post data={postData!.post2} /> : null}
      </div>
    </>
  );
}
