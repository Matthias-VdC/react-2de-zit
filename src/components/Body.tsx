import { useEffect, useState } from "react";
import fetchData from "../services/RedditService";
import BodyPost from "./BodyPost";

export default function Body(props: any) {
  const [bodyData, setBodyData] = useState<any>();
  const [postList, setPostList] = useState<any>([]);

  useEffect(() => {
    (async function fetch() {
      try {
        const response = await fetchData(5, 5);
        console.log("response", response);
        setBodyData(response);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
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
      <div className={props.className}>{postList}</div>
    </>
  );
}
