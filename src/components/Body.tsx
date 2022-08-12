import React, { useEffect, useState } from "react";
import fetchData from "../services/RedditService";
import BodyPost from "./bodyPosts/BodyPost";

export default function Body(props: any) {
  const [bodyData, setBodyData] = useState<any>();
  const [postList, setPostList] = useState<any>([]);
  const [loading, setLoading] = useState<any>();
  const [loadingVisibility, setLoadingVisibility] = useState<any>("none");

  async function fetcher(next: any, nr: any) {
    try {
      let response;

      if (nr) {
        response = await fetchData(5, 5, next, nr, undefined);
      } else {
        response = await fetchData(5, 5, next, 0, undefined);
      }

      if (bodyData) {
        // Adds up new object to previous object into one single object
        setBodyData(Object.assign(bodyData, response));
      } else {
        setBodyData(response);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetcher(undefined, undefined);
  }, []);

  useEffect(() => {
    const event = () => {
      let root = document.getElementById("root");
      // - 550 for header animation difference & 409 for buffer for bottom of page
      // console.log(window.scrollY, root!.scrollHeight - 550 - 409);
      if (window.scrollY >= root!.scrollHeight - 550 - 409) {
        window.scrollTo({
          top: root!.scrollHeight - 550 - 850,
          behavior: "smooth",
        });
        if (bodyData && loadingVisibility === "none") {
          setLoadingVisibility("inline-block");
          fetcher(bodyData.after, Object.keys(bodyData).length - 2);
          console.log("FETCHING");
        }
      }
    };

    // Delay to wait for initial api load since it can be slow
    setTimeout(() => {
      document.addEventListener("scroll", event, false);
    }, 5000);

    setPostList([]);
    for (const key in bodyData) {
      // https://bobbyhadz.com/blog/react-push-to-state-array
      setPostList((current: any) => [
        ...current,
        <BodyPost data={bodyData[key]} key={key} />,
      ]);
    }
  }, [bodyData]);

  useEffect(() => {
    setLoading(
      <div className="lds-ring" style={{ display: loadingVisibility }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }, [bodyData, loadingVisibility, postList]);

  useEffect(() => {
    setLoadingVisibility("none");
  }, [postList]);

  return (
    <>
      <div className={props.className + " center-body"}>
        {postList}
        {/* https://loading.io/css/ */}
        {loading}
      </div>
    </>
  );
}
