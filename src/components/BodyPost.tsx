export default function BodyPost(props: any) {
  let data = props.data;
  return (
    <>
      <div>{data.subreddit}</div>
    </>
  );
}
