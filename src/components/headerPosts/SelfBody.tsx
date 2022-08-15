export default function SelfBody(props: any) {
  let data = props;

  function decodeHtml(html: any) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    let newValue = txt.value.replace(/(.*?<!-- SC_OFF -->)/, "");
    newValue = newValue.replace(/(.*?<!-- SC_ON -->)/, "");
    return newValue;
  }

  // https://www.reddit.com/r/redditdev/comments/39rs0m/javascript_to_format_reddit_links_from_selftext/
  return (
    <div
      className="post-body-containers"
      style={{ display: "flex", flexDirection: "column", overflow: "scroll" }}
    >
      <p className="post-body-hosted-title">
        {data.data.data.title.replace(/ &amp; /gm, ". ")}
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: decodeHtml(data.data.data.self) }}
      ></div>
    </div>
  );
}
