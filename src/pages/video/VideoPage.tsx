import VideoLookupBar from "./components/VideoLookupBar.tsx";
import VideoNavigationBar from "./components/VideoNavigationBar.tsx";
import {useEffect, useState} from "react";
import type {IVideo} from "./types.ts";
import {Outlet, useNavigate} from "react-router-dom";

export default function VideoPage() {
    const navigate = useNavigate();

    const [videoData,setVideoData ] =useState([]);

    const handleFetch=()=>{
        const accessToken=localStorage.getItem("youtube-user:accessToken");
        if(!accessToken){
            return;
        }
        fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/videos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${accessToken}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setVideoData(data.data.videos);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        handleFetch();
    }, []);

    function timeAgo(date: string) {
        const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

        const then = new Date(date).getTime();
        // eslint-disable-next-line react-hooks/purity
        const now = Date.now();
        const diff = now - then;

        const minutes = diff / 1000 / 60;
        const hours = minutes / 60;
        const days = hours / 24;

        if (minutes < 60) return formatter.format(Math.round(-minutes), "minute");
        if (hours < 24)   return formatter.format(Math.round(-hours), "hour");
        return formatter.format(Math.round(-days), "day");
    }

    function formatDuration(seconds: number) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hrs > 0) {
            return `${hrs}:${mins}:${secs}`;
        }

        return `${mins}:${secs}`;
    }

    const handleVideoClick=(video:IVideo)=> {
        navigate(`/video/${video._id}`)
    }

    return (
        <div className="dark:bg-black dark:text-white w-full">
            <VideoLookupBar/>
            <div className="flex items-start gap-2">

            <VideoNavigationBar/>
                <div className="xl:grid xl:grid-cols-3 gap-5 px-5 pb-10">
                    {videoData?.map((video:IVideo) => (
                        <div className="hover:bg-gray-600 p-2 rounded-2xl cursor-pointer delay-100 duration-500 ease-in-out" onClick={()=> handleVideoClick(video)} key={video._id}>
                            <div className="relative">
                            <img src={video?.thumbnail} className="2xl:w-[40rem] w-[30rem] h-[20rem] rounded-2xl" alt="thumnail" />
                                <span className="absolute bottom-5 right-5 bg-black/60 px-2 py-1 rounded-lg text-xs font-bold">{formatDuration(video.duration)}</span>
                            </div>

                            <div className="flex items-start gap-2 mt-5">
                                <img src={video.owner[0].avatar} className="w-20 h-20 rounded-full" alt="avatar" />
                                <div>
                                    <h4 className="text-xl font-bold">{video?.title}</h4>
                                    <p className="text-sm font-normal">{video?.owner[0].fullName}</p>
                                    <div className="flex items-center gap-2">
                                    <p>{video.views} views</p>
                                        <span className="bg-white rounded-full w-1 h-1"></span>
                                        <p>{timeAgo(video.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        <Outlet />
        </div>

);
};
