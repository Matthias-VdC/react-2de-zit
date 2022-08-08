import { useEffect, useState } from "react";
import fetchData from "../services/RedditService";
import BodyPost from "./bodyPosts/BodyPost";

export default function Body(props: any) {
  const [bodyData, setBodyData] = useState<any>();
  const [postList, setPostList] = useState<any>([]);

  async function fetcher(next: any, nr: any) {
    try {
      let response;

      if (nr) {
        response = await fetchData(5, 5, next, nr);
      } else {
        response = await fetchData(5, 5, next, 0);
      }

      if (bodyData) {
        console.log("response", Object.assign(bodyData, response));
        setBodyData(Object.assign(bodyData, response));
      } else {
        console.log("response", response);
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
    setTimeout(() => {
      let root = document.getElementById("root");

      document.addEventListener("scroll", (e) => {
        // - 550 for header animation difference & 409 for buffer for bottom of page
        // console.log(window.scrollY, root!.scrollHeight - 550 - 409);
        if (window.scrollY >= root!.scrollHeight - 550 - 409) {
          window.scrollTo({
            top: root!.scrollHeight - 550 - 850,
            behavior: "smooth",
          });

          if (bodyData) {
            fetcher(bodyData.after, Object.keys(bodyData).length - 2);
          }
        }
      });
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

  return (
    <>
      <div className={props.className + " center-body"}>{postList}</div>
    </>
  );
}
