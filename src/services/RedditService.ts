import VideoBody from "../components/posts/VideoBody";
import LinkBody from "../components/posts/LinkBody";
import ImageBody from "../components/posts/ImageBody";
import HostedBody from "../components/posts/HostedBody";
import subredditDefaultIcon from "../assets/subreddit-default.webp";

// ☠ this api should be illegal to work with ☠
let url = "https://www.reddit.com/.json?limit=2&count=2&after=";
let after = "";
let postData = { post1: {}, post2: {} } || undefined;

export default async function fetchData() {
    return (async function fetchAgain(): Promise<any> {
        try {
            return await fetch(url)
                .then(response => response.json())
                .then(async data => {

                    console.log("original", data.data);
                    after = data.data.after
                    let isUndefined = false;

                    // SKIPPING ALL UNDEFINED POSTS BECAUSE THEY'RE IMPOSSIBLE TO WORK WITH
                    if (data.data.children[0].data.post_hint === undefined || data.data.children[1].data.post_hint === undefined) {
                        console.log("undefined");
                        url = url.replace(/(?<=&after=).*$/gm, after);
                        console.log(url);
                        isUndefined = true;
                        return fetchAgain();

                    }

                    // START - Get icons from subreddits
                    let [subreddit1, subreddit2] = await Promise.all([
                        fetch(`https://www.reddit.com/r/${data.data.children[0].data.subreddit}/about.json`),
                        fetch(`https://www.reddit.com/r/${data.data.children[1].data.subreddit}/about.json`)
                    ]);

                    subreddit1.json().then(data1 => {
                        let communityIcon1 = "";
                        if (data1.data.community_icon === undefined && data1.data.data_img !== undefined) {
                            communityIcon1 = data1.data.icon_img;
                        } else if (data1.data.community_icon !== undefined && data1.data.data_img === undefined) {
                            communityIcon1 = data1.data.community_icon;
                            // fix faulty url: https://www.reddit.com/r/redditdev/comments/o9k4r9/how_to_access_resources_at/
                            communityIcon1 = communityIcon1.replace(/\bamp;\b/gm, "");
                        } else {
                            communityIcon1 = subredditDefaultIcon;
                        }

                        subreddit2.json().then(async data2 => {
                            let communityIcon2 = "";
                            if (data2.data.community_icon === undefined && data2.data.data_img !== undefined) {
                                communityIcon2 = data2.data.icon_img;
                            } else if (data2.data.community_icon !== undefined && data2.data.data_img === undefined) {
                                communityIcon2 = data2.data.community_icon;
                                // fix faulty url: https://www.reddit.com/r/redditdev/comments/o9k4r9/how_to_access_resources_at/
                                communityIcon2 = communityIcon2.replace(/\bamp;\b/gm, "");
                            } else {
                                communityIcon2 = subredditDefaultIcon;
                            }

                            if (communityIcon1 === undefined) {
                                communityIcon1 = subredditDefaultIcon;
                            }
                            if (communityIcon2 === undefined) {
                                communityIcon2 = subredditDefaultIcon;
                            }
                            // END - Get icons from subreddits



                            // START - Get date difference for posts and convert to seconds/minutes/hours/days/years
                            const dateNow = new Date();
                            // https://stackoverflow.com/questions/44861119/convert-reddits-created-unix-timestamp-to-readable-date
                            let datePost1 = new Date(data.data.children[0].data.created * 1000);
                            let seconds1 = Math.floor((datePost1.getTime() - dateNow.getTime()) / 1000);
                            let datePost2 = new Date(data.data.children[1].data.created * 1000);
                            let seconds2 = Math.floor((datePost2.getTime() - dateNow.getTime()) / 1000);
                            // https://stackoverflow.com/questions/4652104/convert-a-negative-number-to-a-positive-one-in-javascript
                            seconds1 = Math.abs(seconds1);
                            seconds2 = Math.abs(seconds2);

                            let timeDifference1 = "";
                            let timeDifference2 = "";

                            if (seconds1 < 60) {
                                timeDifference1 = `${seconds1} seconds`;
                            } else if (seconds1 > 60 && seconds1 < 3600) {
                                // https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
                                timeDifference1 = `${Math.floor(seconds1 % 3600 / 60)} minutes`;
                            } else if (seconds1 > 3600 && seconds1 < 86400) {
                                timeDifference1 = `${Math.floor(seconds1 / 3600)} hours`;
                            } else if (seconds1 > 86400 && seconds1 < 2629743.83) {
                                timeDifference1 = `${Math.floor(seconds1 / (3600 * 24))} days`;
                            } else if (seconds1 > 2629743.83 && seconds1 < 31556926) {
                                timeDifference1 = `${Math.floor((seconds1 / (3600 * 24)) / 30)} months`;
                            } else {
                                timeDifference1 = `${Math.floor((seconds1 / (3600 * 24)) / 30 / 12)} years`
                            }
                            if (seconds2 < 60) {
                                timeDifference2 = `${seconds2} seconds`;
                            } else if (seconds2 > 60 && seconds2 < 3600) {
                                // https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
                                timeDifference2 = `${Math.floor(seconds2 % 3600 / 60)} minutes`;
                            } else if (seconds2 > 3600 && seconds2 < 86400) {
                                timeDifference2 = `${Math.floor(seconds2 / 3600)} hours`;
                            } else if (seconds2 > 86400 && seconds2 < 2629743.83) {
                                timeDifference2 = `${Math.floor(seconds2 / (3600 * 24))} days`;
                            } else if (seconds2 > 2629743.83 && seconds2 < 31556926) {
                                timeDifference2 = `${Math.floor((seconds2 / (3600 * 24)) / 30)} months`;
                            } else {
                                timeDifference2 = `${Math.floor((seconds2 / (3600 * 24)) / 30 / 12)} years`
                            }
                            // END - Get all date differences


                            // START - Distribute data based on post type for both posts
                            if (data.data.children[0].data.post_hint === "link") {
                                console.log("link");
                                postData.post1 = {
                                    subreddit: data.data.children[0].data.subreddit,
                                    bodyType: data.data.children[0].data.post_hint,
                                    body: LinkBody,
                                    nr: 1,
                                    thumbnail: data.data.children[0].data.thumbnail,
                                    icon: communityIcon1,
                                    author: data.data.children[0].data.author,
                                    time: timeDifference1,
                                }
                            } else if (data.data.children[0].data.post_hint === "image") {
                                console.log("image");
                                postData.post1 = {
                                    subreddit: data.data.children[0].data.subreddit,
                                    bodyType: data.data.children[0].data.post_hint,
                                    body: ImageBody,
                                    nr: 1,
                                    url: data.data.children[0].data.url,
                                    title: data.data.children[0].data.title,
                                    icon: communityIcon1,
                                    author: data.data.children[0].data.author,
                                    time: timeDifference1,
                                }
                            } else if (data.data.children[0].data.post_hint === "hosted:video") {
                                console.log("hosted:video");
                                postData.post1 = {
                                    subreddit: data.data.children[0].data.subreddit,
                                    bodyType: data.data.children[0].data.post_hint,
                                    body: HostedBody,
                                    nr: 1,
                                    url: data.data.children[0].data.url,
                                    title: data.data.children[0].data.title,
                                    icon: communityIcon1,
                                    author: data.data.children[0].data.author,
                                    time: timeDifference1,
                                }
                            } else {
                                console.log("An error has occured with fetching data from reddit.com");
                            }


                            if (data.data.children[1].data.post_hint === "link") {
                                console.log("link");
                                let thumbnail = data.data.children[1].data.thumbnail;
                                if (thumbnail !== "default") {
                                    postData.post2 = {
                                        subreddit: data.data.children[1].data.subreddit,
                                        bodyType: data.data.children[1].data.post_hint,
                                        body: LinkBody,
                                        nr: 2,
                                        thumbnail: data.data.children[1].data.thumbnail,
                                        icon: communityIcon2,
                                        author: data.data.children[1].data.author,
                                        time: timeDifference2,
                                    }
                                } else {
                                    postData.post2 = {
                                        subreddit: data.data.children[1].data.subreddit,
                                        bodyType: data.data.children[1].data.post_hint,
                                        body: LinkBody,
                                        nr: 2,
                                        thumbnail: data.data.children[1].data.preview.images[0].source.url,
                                        icon: communityIcon2,
                                        author: data.data.children[1].data.author,
                                        time: timeDifference2,
                                    }
                                }
                            } else if (data.data.children[1].data.post_hint === "image") {
                                console.log("image");
                                postData.post2 = {
                                    subreddit: data.data.children[1].data.subreddit,
                                    bodyType: data.data.children[1].data.post_hint,
                                    body: ImageBody,
                                    nr: 2,
                                    url: data.data.children[1].data.url,
                                    title: data.data.children[1].data.title,
                                    icon: communityIcon2,
                                    author: data.data.children[1].data.author,
                                    time: timeDifference2,
                                }
                            } else if (data.data.children[1].data.post_hint === "hosted:video") {
                                console.log("hosted:video");
                                postData.post2 = {
                                    subreddit: data.data.children[1].data.subreddit,
                                    bodyType: data.data.children[1].data.post_hint,
                                    body: HostedBody,
                                    nr: 2,
                                    url: data.data.children[1].data.url,
                                    title: data.data.children[1].data.title,
                                    icon: communityIcon2,
                                    author: data.data.children[1].data.author,
                                    time: timeDifference2,
                                }
                            } else {
                                console.log("An error has occured with fetching data from reddit.com");
                            }
                            // END - Added all used data to postData
                        });
                    });
                    if (!isUndefined) return postData;
                });
        } catch (err) {
            console.log("Reddit api error: ", err);
            return fetchAgain();
        }
    })();
}