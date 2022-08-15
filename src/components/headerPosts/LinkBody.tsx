import missing from "../../assets/noimage.png";

export default function LinkBody(props: any) {
  let data = props;
  if (data.data.data.thumbnail === "default") {
    data.data.data.thumbnail = missing;
  }
  return (
    <div className="post-body-containers">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <p className="post-body-hosted-title">
          {data.data.data.title.replace(/ &amp; /gm, ". ")}
        </p>
        <a href={data.data.data.link} rel="noreferrer" target="_blank">
          <img
            className="post-body-link-thumbnail"
            src={data.data.data.thumbnail}
            alt=""
          ></img>
        </a>
      </div>
    </div>
  );
}
