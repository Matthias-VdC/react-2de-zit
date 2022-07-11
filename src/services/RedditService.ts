import VideoBody from "../components/posts/VideoBody";
import LinkBody from "../components/posts/LinkBody";
import ImageBody from "../components/posts/ImageBody";
import { JsxEmit } from "typescript";

// ☠ this api should be illegal to work with ☠
let url = "https://www.reddit.com/.json?limit=2&count=2&after=";
let after = "";
let postData = {
    post1: {

    },
    post2: {

    }
};
let skipped = false;

export default async function fetchData(previous: any, next: any, skippedAlready: boolean) {
    return await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("original", data.data.children);
            skipped = false;
            after = data.data.after



            if (data.data.children[0].data.post_hint === "link") {
                console.log("link");
                postData.post1 = {
                    subreddit: data.data.children[0].data.subreddit,
                    bodyType: data.data.children[0].data.post_hint,
                    body: LinkBody,
                    nr: 1,
                }
            } else if (data.data.children[0].data.post_hint === "image") {
                console.log("image");
                postData.post1 = {
                    subreddit: data.data.children[0].data.subreddit,
                    bodyType: data.data.children[0].data.post_hint,
                    body: ImageBody,
                    nr: 1,
                }
            } else if (data.data.children[0].data.post_hint === "hosted:video") {
                console.log("hosted:video");
            } else if (data.data.children[0].data.post_hint === undefined || data.data.children[1].data.post_hint === undefined) {
                // SKIPPING ALL UNDEFINED POSTS BECAUSE THEY'RE IMPOSSIBLE TO WORK WITH
                console.log("undefined");
                url.replace(/(?<=&after=).*$/, after);
                skipped = true;
                fetchData(previous, next, skipped);
            } else {
                console.log("An error has occured with fetching data from reddit.com");
            }




            if (data.data.children[1].data.post_hint === "link") {
                console.log("link");
                postData.post2 = {
                    subreddit: data.data.children[1].data.subreddit,
                    bodyType: data.data.children[1].data.post_hint,
                    body: LinkBody,
                    nr: 2,
                }
            } else if (data.data.children[1].data.post_hint === "image") {
                console.log("image");
                postData.post2 = {
                    subreddit: data.data.children[1].data.subreddit,
                    bodyType: data.data.children[1].data.post_hint,
                    body: ImageBody,
                    nr: 2,
                }
            } else if (data.data.children[1].data.post_hint === "hosted:video") {
                console.log("hosted:video");
            } else if (data.data.children[1].data.post_hint === undefined) {
                // SKIPPING ALL UNDEFINED POSTS BECAUSE THEY'RE IMPOSSIBLE TO WORK WITH
                console.log("undefined");
                url.replace(/(?<=&after=).*$/, after);
                skipped = true;
                fetchData(previous, next, skipped);
            } else {
                console.log("An error has occured with fetching data from reddit.com");
            }
            return postData;
        });
}