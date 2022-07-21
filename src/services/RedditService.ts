import VideoBody from "../components/posts/VideoBody";
import LinkBody from "../components/posts/LinkBody";
import ImageBody from "../components/posts/ImageBody";
import HostedBody from "../components/posts/HostedBody";
import subredditDefaultIcon from "../assets/subreddit-default.png";
import SelfBody from "../components/posts/SelfBody";

// ☠ this api should be illegal to work with ☠

export default async function fetchData(count: number, limit: number) {
    let postData = {};

    return ((async function dataHandler(after: any) {
        let url = `https://www.reddit.com/.json?limit=${limit}&count=${count}&after=${after}`;

        return (await fetch(url).then(response => response.json()).then(async data => {
            let afterPost = data.data.after;
            let isUndefined = false;
            console.log("original", data.data);
            for (let i = 0; i < count; i++) {
                let communityIcon = "";

                // START - Get icons from subreddits
                await fetch(`https://www.reddit.com/r/${data.data.children[i].data.subreddit}/about.json`).then(response => response.json()).then(communityData => {
                    if (communityData.data.community_icon === undefined && communityData.data.data_img !== undefined) {
                        communityIcon = communityData.data.icon_img;
                    } else if (communityData.data.community_icon !== undefined && communityData.data.data_img === undefined) {
                        communityIcon = communityData.data.community_icon;
                        // fix faulty url: https://www.reddit.com/r/redditdev/comments/o9k4r9/how_to_access_resources_at/
                        communityIcon = communityIcon.replace(/\bamp;\b/gm, "");
                    } else {
                        communityIcon = subredditDefaultIcon;
                    }

                    if (communityIcon === "") {
                        communityIcon = subredditDefaultIcon;
                    }
                });
                // END - Get icons from subreddits

                // SKIPPING ALL UNDEFINED POSTS BECAUSE THEY'RE IMPOSSIBLE TO WORK WITH
                if (data.data.children[i].data.post_hint === undefined) {
                    isUndefined = true;
                    url = url.replace(/(?<=&after=).*$/gm, afterPost);
                    console.log("undefined", afterPost, url);
                    dataHandler(afterPost);
                }

                // START - Get date difference for posts and convert to seconds/minutes/hours/days/years
                const dateNow = new Date();
                // https://stackoverflow.com/questions/44861119/convert-reddits-created-unix-timestamp-to-readable-date
                let datePost = new Date(data.data.children[i].data.created * 1000);
                let seconds = Math.floor((datePost.getTime() - dateNow.getTime()) / 1000);
                // https://stackoverflow.com/questions/4652104/convert-a-negative-number-to-a-positive-one-in-javascript
                seconds = Math.abs(seconds);
                let timeDifference = "";

                if (seconds < 60) {
                    timeDifference = `${seconds} seconds`;
                } else if (seconds > 60 && seconds < 3600) {
                    // https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
                    timeDifference = `${Math.floor(seconds % 3600 / 60)} minutes`;
                } else if (seconds > 3600 && seconds < 86400) {
                    timeDifference = `${Math.floor(seconds / 3600)} hours`;
                } else if (seconds > 86400 && seconds < 2629743.83) {
                    timeDifference = `${Math.floor(seconds / (3600 * 24))} days`;
                } else if (seconds > 2629743.83 && seconds < 31556926) {
                    timeDifference = `${Math.floor((seconds / (3600 * 24)) / 30)} months`;
                } else {
                    timeDifference = `${Math.floor((seconds / (3600 * 24)) / 30 / 12)} years`
                }
                // END - Get all date differences


                // START - Sort all data to make it usable
                if (data.data.children[i].data.post_hint === "link") {
                    console.log("link");
                    // help again for another link (same issue with amp;) https://www.reddit.com/r/redditdev/comments/9ncg2r/deleted_by_user/
                    let image = data.data.children[i].data.preview.images[0].source.url;
                    image = image.replace(/\bamp;\b/gm, "");

                    // https://stackoverflow.com/questions/43618878/how-to-disable-a-ts-rule-for-a-specific-line
                    // @ts-ignore: Unreachable code error
                    postData["post" + i] = {
                        subreddit: data.data.children[i].data.subreddit,
                        bodyType: data.data.children[i].data.post_hint,
                        body: LinkBody,
                        nr: i,
                        thumbnail: image,
                        icon: communityIcon,
                        author: data.data.children[i].data.author,
                        time: timeDifference,
                        link: data.data.children[i].data.url,
                        ups: data.data.children[i].data.ups,
                        title: data.data.children[i].data.title,
                    }
                } else if (data.data.children[i].data.post_hint === "image") {
                    console.log("image");
                    // @ts-ignore: Unreachable code error
                    postData["post" + i] = {
                        subreddit: data.data.children[i].data.subreddit,
                        bodyType: data.data.children[i].data.post_hint,
                        body: ImageBody,
                        nr: i,
                        url: data.data.children[i].data.url,
                        title: data.data.children[i].data.title,
                        icon: communityIcon,
                        author: data.data.children[i].data.author,
                        time: timeDifference,
                        ups: data.data.children[i].data.ups,
                    }
                } else if (data.data.children[i].data.post_hint === "hosted:video" || data.data.children[i].data.post_hint === "rich:video") {
                    console.log("hosted:video");

                    // get mp3 https://www.reddit.com/r/redditsync/comments/i3pyfx/how_and_where_to_download_just_audio_from_reddit/


                    let audio = data.data.children[i].data.secure_media.reddit_video.fallback_url.replace(/\DASH_(.*)/, "DASH_audio.mp4");

                    if (data.data.children[i].data.post_hint === "hosted:video") {
                        // @ts-ignore: Unreachable code error
                        postData["post" + i] = {
                            subreddit: data.data.children[i].data.subreddit,
                            bodyType: data.data.children[i].data.post_hint,
                            body: HostedBody,
                            nr: i,
                            url: data.data.children[i].data.url,
                            title: data.data.children[i].data.title,
                            icon: communityIcon,
                            author: data.data.children[i].data.author,
                            time: timeDifference,
                            video: data.data.children[i].data.secure_media.reddit_video.fallback_url,
                            audio: audio,
                            ups: data.data.children[i].data.ups,
                        }
                    } else {
                        let full = data.data.children[i].data.secure_media_embed.content;
                        let link = full.match(/src="(.*?)"/gm);
                        // link = link[0].replace(/\bamp;\b/gm, "");
                        // link = link.replace(/\bsrc="\b/gm, "");
                        // link = link.slice(0, -1);
                        // @ts-ignore: Unreachable code error
                        postData["post" + i] = {
                            subreddit: data.data.children[i].data.subreddit,
                            bodyType: data.data.children[i].data.post_hint,
                            body: HostedBody,
                            nr: i,
                            url: data.data.children[i].data.url,
                            title: data.data.children[i].data.title,
                            icon: communityIcon,
                            author: data.data.children[i].data.author,
                            time: timeDifference,
                            video: link,
                            ups: data.data.children[i].data.ups,
                        }
                    }
                } else if (data.data.children[i].data.post_hint === "self") {
                    console.log("self");

                    // @ts-ignore: Unreachable code error
                    postData["post" + i] = {
                        subreddit: data.data.children[i].data.subreddit,
                        bodyType: data.data.children[i].data.post_hint,
                        body: SelfBody,
                        nr: i,
                        title: data.data.children[i].data.title,
                        icon: communityIcon,
                        author: data.data.children[i].data.author,
                        time: timeDifference,
                        ups: data.data.children[i].data.ups,
                        self: data.data.children[i].data.selftext_html,
                    }
                } else {
                    console.log("An error has occured with fetching data from reddit.com");
                }
            }
            // END - Added all used data to postData
            if (!isUndefined) return postData; else dataHandler(afterPost);
        }));
    })(""));
}