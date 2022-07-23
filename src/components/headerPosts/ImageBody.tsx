/* eslint-disable jsx-a11y/img-redundant-alt */
export default function ImageBody(props: any) {
  return (
    <div className="post-body-containers">
      <div className="post-body-image-container">
        <p className="post-body-image-title">{props.data.data.title}</p>
        <img
          className="post-body-image"
          src={props.data.data.url}
          alt="image"
        ></img>
      </div>
    </div>
  );
}
