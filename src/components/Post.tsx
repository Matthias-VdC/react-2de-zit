import { useEffect, useState } from "react";

export default function Post(props: any) {
  const [page, setPage] = useState(1);
  const [scrollState, setScrollState] = useState("scrollIn");

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY === 0) {
        setPage(1);
      }
    });
  }, []);

  return (
    <div className="post-container">
      <div className="post-header"></div>
      <div className="post-body"></div>
      <div className="post-footer"></div>
    </div>
  );
}
