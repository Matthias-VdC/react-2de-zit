import VideoBody from "../components/headerPosts/VideoBody";
import LinkBody from "../components/headerPosts/LinkBody";
import ImageBody from "../components/headerPosts/ImageBody";
import HostedBody from "../components/headerPosts/HostedBody";
import subredditDefaultIcon from "../assets/subreddit-default.png";
import SelfBody from "../components/headerPosts/SelfBody";

// ☠ this api should be illegal to work with ☠

export default async function fetchData(count: number, limit: number, next: any, from: any, specific: any) {
    let postData = {};

    // @ts-ignore: Unreachable code error
    return (await (async function dataHandler(after: any) {
        if (next !== undefined && !after) {
            after = next;
        }


        let url = `https://www.reddit.com/.json?limit=${limit}&count=${count}&after=${after}`;

        if (specific) {
            url = `https://www.reddit.com/${specific}.json`;
        }

        // @ts-ignore: Unreachable code error
        return (await fetch(url).then(response => response.json()).then(async data => {
            let d = data.data;
            if (specific) {
                d = data[0].data;
            }
            let afterPost = d.after;
            let isUndefined = false;
            // @ts-ignore: Unreachable code error
            postData["after"] = afterPost;

            let postCount = from;

            for (let i = 0; i < count; i++) {

                // SKIPPING ALL UNDEFINED POSTS BECAUSE THEY'RE IMPOSSIBLE TO WORK WITH
                if (!d.children[i].data.post_hint) {
                    isUndefined = true;
                    url = url.replace(/(?<=&after=).*$/gm, afterPost);
                    console.log("undefined", afterPost, url);
                    return await dataHandler(afterPost);
                }

                let communityIcon = "";

                // START - Get icons from subreddits
                await fetch(`https://www.reddit.com/r/${d.children[i].data.subreddit}/about.json`).then(response => response.json()).then(communityData => {
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

                // START - Get date difference for posts and convert to seconds/minutes/hours/days/years
                const dateNow = new Date();
                // https://stackoverflow.com/questions/44861119/convert-reddits-created-unix-timestamp-to-readable-date
                let datePost = new Date(d.children[i].data.created * 1000);
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

                let isover18: boolean;

                if (d.children[i].data.over_18) { isover18 = true } else { isover18 = false }


                // START - Sort all data to make it usable
                if (d.children[i].data.post_hint === "link") {
                    // help again for another link (same issue with amp;) https://www.reddit.com/r/redditdev/comments/9ncg2r/deleted_by_user/
                    let image = d.children[i].data.preview.images[0].source.url;
                    image = image.replace(/\bamp;\b/gm, "");

                    // https://stackoverflow.com/questions/43618878/how-to-disable-a-ts-rule-for-a-specific-line
                    // @ts-ignore: Unreachable code error
                    postData["post" + postCount] = {
                        subreddit: d.children[i].data.subreddit,
                        bodyType: d.children[i].data.post_hint,
                        body: LinkBody,
                        nr: i,
                        thumbnail: image,
                        icon: communityIcon,
                        author: d.children[i].data.author,
                        time: timeDifference,
                        link: d.children[i].data.url,
                        ups: d.children[i].data.ups,
                        title: d.children[i].data.title,
                        comments: d.children[i].data.num_comments,
                        over18: isover18,
                        id: d.children[i].data.id,
                    }
                } else if (d.children[i].data.post_hint === "image") {
                    // @ts-ignore: Unreachable code error
                    postData["post" + postCount] = {
                        subreddit: d.children[i].data.subreddit,
                        bodyType: d.children[i].data.post_hint,
                        body: ImageBody,
                        nr: i,
                        url: d.children[i].data.url,
                        title: d.children[i].data.title,
                        icon: communityIcon,
                        author: d.children[i].data.author,
                        time: timeDifference,
                        ups: d.children[i].data.ups,
                        comments: d.children[i].data.num_comments,
                        over18: isover18,
                        id: d.children[i].data.id,
                    }
                } else if (d.children[i].data.post_hint === "hosted:video") {

                    // get mp3 https://www.reddit.com/r/redditsync/comments/i3pyfx/how_and_where_to_download_just_audio_from_reddit/


                    let audio = d.children[i].data.secure_media.reddit_video.fallback_url.replace(/\DASH_(.*)/, "DASH_audio.mp4");

                    // @ts-ignore: Unreachable code error
                    postData["post" + postCount] = {
                        subreddit: d.children[i].data.subreddit,
                        bodyType: d.children[i].data.post_hint,
                        body: HostedBody,
                        nr: i,
                        url: d.children[i].data.url,
                        title: d.children[i].data.title,
                        icon: communityIcon,
                        author: d.children[i].data.author,
                        time: timeDifference,
                        video: d.children[i].data.secure_media.reddit_video.fallback_url,
                        audio: audio,
                        ups: d.children[i].data.ups,
                        comments: d.children[i].data.num_comments,
                        over18: isover18,
                        id: d.children[i].data.id,
                    }
                } else if (d.children[i].data.post_hint === "rich:video") {
                    let full = d.children[i].data.secure_media_embed.content;
                    let link = full.match(/src="(.*?)"/gm);
                    // link = link[0].replace(/\bamp;\b/gm, "");
                    // link = link.replace(/\bsrc="\b/gm, "");
                    // link = link.slice(0, -1);
                    // @ts-ignore: Unreachable code error
                    postData["post" + postCount] = {
                        subreddit: d.children[i].data.subreddit,
                        bodyType: d.children[i].data.post_hint,
                        body: HostedBody,
                        nr: i,
                        url: d.children[i].data.url,
                        title: d.children[i].data.title,
                        icon: communityIcon,
                        author: d.children[i].data.author,
                        time: timeDifference,
                        video: link,
                        ups: d.children[i].data.ups,
                        comments: d.children[i].data.num_comments,
                        over18: isover18,
                        id: d.children[i].data.id,
                    };
                } else if (d.children[i].data.post_hint === "self") {

                    // @ts-ignore: Unreachable code error
                    postData["post" + postCount] = {
                        subreddit: d.children[i].data.subreddit,
                        bodyType: d.children[i].data.post_hint,
                        body: SelfBody,
                        nr: i,
                        title: d.children[i].data.title,
                        icon: communityIcon,
                        author: d.children[i].data.author,
                        time: timeDifference,
                        ups: d.children[i].data.ups,
                        self: d.children[i].data.selftext_html,
                        comments: d.children[i].data.num_comments,
                        over18: isover18,
                        id: d.children[i].data.id,
                    }
                } else {
                    console.log("An error has occured with fetching data from reddit.com");
                }
                postCount = postCount + 1;
                // @ts-ignore: Unreachable code error
                postData["last"] = postCount;
            }
            // END - Added all used data to postData
            if (!isUndefined) return postData; else return await dataHandler(afterPost);
        }
        ));

    })(""));
}