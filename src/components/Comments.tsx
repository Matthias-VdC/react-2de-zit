import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Comments() {
  // https://v5.reactrouter.com/web/example/url-params
  let { id } = useParams();

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    // Fix eventlisteners persisting through pages
    // https://www.codegrepper.com/code-examples/javascript/javascript+window.location.reload+only+once+in+react
    if (!window.location.hash) {
      // @ts-ignore: Unreachable code error
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  }, []);

  return (
    <>
      <p style={{ position: "fixed", bottom: "50%", left: "50%" }}>{id}</p>
      <button
        onClick={() => {
          console.log("test");
        }}
      >
        back
      </button>
    </>
  );
}
