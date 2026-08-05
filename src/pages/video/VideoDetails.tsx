import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import type {ISubscriber, IVideo} from "./types.ts";
import VideoLookupBar from "./components/VideoLookupBar.tsx";
import {UserContext} from "../../kernel/context/user.tsx";

export default function VideoDetails() {
    const {id}=useParams();
    const navigate = useNavigate();
    const [videoData,setVideoData ] =useState<IVideo[]>([]);
    const [allVideoData,setAllVideoData ] =useState<IVideo[]>([]);
    const [subscriberData,setSubscriberData ] =useState<ISubscriber[]>([]);
    // @ts-ignore
    const { user , setUser} = useContext(UserContext);

    const handleFetch=()=>{
        const accessToken=localStorage.getItem("youtube-user:accessToken");
        if(!accessToken){
            return;
        }
        fetch("${import.meta.env.VITE_BASE_URL}/api/v1/videos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${accessToken}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAllVideoData(data.data.videos);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleFetchVideoDetails=()=>{
        const accessToken=localStorage.getItem("youtube-user:accessToken");
        if(!accessToken){
            return;
        }
        fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/videos/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${accessToken}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setVideoData(data.data);
                handleSubscriberFetch(data.data[0]?.owner[0]?._id);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleSubscriberFetch=(videoOwnerId:string)=>{
        const accessToken=localStorage.getItem("youtube-user:accessToken");
        if(!accessToken){
            return;
        }
        fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/subscriptions/u/${videoOwnerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${accessToken}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setSubscriberData(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        handleFetchVideoDetails();
        handleFetch();
    }, [id]);

    useEffect(() => {
        const cachedUser = localStorage.getItem("youtube-user:user");
        if(cachedUser){
            setUser(JSON.parse(cachedUser));
        }
    }, []);

    function timeAgo(date: string|undefined) {
        if(!date) return ;
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

    const handleSubscriptionToggle=()=>{
        const accessToken=localStorage.getItem("youtube-user:accessToken");
        const videoOwnerId=videoData[0].owner[0]._id;
        if(!accessToken){
            return;
        }
        fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/subscriptions/u/${videoOwnerId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${accessToken}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data)
               handleSubscriberFetch(videoOwnerId);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="w-full h-full dark:bg-black dark:text-white">
            <VideoLookupBar/>
            <div className="flex items-start justify-center gap-5 w-full px-6 pb-20">
                <div>
                    <video controls  poster={videoData[0]?.thumbnail} src={videoData[0]?.videoFile} className="w-[80rem] h-[40rem] border border-gray-200 rounded-2xl object-fill"></video>
                    <div className="mt-5">
                        <h4 className="text-xl font-bold">{videoData[0]?.title}</h4>
                        <div className="flex items-center justify-between my-5">
                            <div className="flex items-center gap-2">
                                <img src={videoData[0]?.owner[0]?.avatar} alt="avatar" className="w-10 h-10 rounded-full"/>
                                <div >
                                    <p>{videoData[0]?.owner[0]?.fullName}</p>
                                    <p className="text-xs">{subscriberData.length} subscribers</p>
                                </div>
                            </div>
                            <button onClick={handleSubscriptionToggle} className={subscriberData.some((subscriber:ISubscriber) => subscriber.subscriber === user._id) ?"bg-gray-600 py-2 px-4 rounded-full hover:brightness-125 cursor-pointer": "bg-red-600 py-2 px-4 rounded-full hover:brightness-125 cursor-pointer" }>{subscriberData.some((subscriber:ISubscriber) => subscriber.subscriber === user._id) ? "Subscribed" : "Subscribe"}</button>
                        </div>
                        <div className="bg-neutral-600/50 hover:bg-indigo-950 p-5 rounded-2xl">
                            <div className="flex items-center gap-2 text-sm">
                                <p>{videoData[0]?.views} views</p>
                                <span className="bg-white rounded-full w-1 h-1"></span>
                                <p>{timeAgo(videoData[0]?.createdAt)}</p>
                            </div>
                            <p>{videoData[0]?.description}</p>
                        </div>
                    </div>
                </div>
                <div className="w-80 flex flex-col gap-2">
                    {allVideoData?.map((video:IVideo) => (
                        <div className="hover:bg-gray-600 p-2 rounded-2xl cursor-pointer delay-100 duration-500 ease-in-out" onClick={()=> handleVideoClick(video)} key={video._id}>
                            <div className="relative">
                                <img src={video?.thumbnail} className="2xl:w-[20rem] w-[20rem] h-[10rem] rounded-2xl" alt="thumnail" />
                                <span className="absolute bottom-5 right-5 bg-black/60 px-2 py-1 rounded-lg text-xs font-bold">{formatDuration(video.duration)}</span>
                            </div>

                            <div className="flex items-start gap-2 mt-5">
                                <img src={video.owner[0].avatar} className="w-10 h-10 rounded-full" alt="avatar" />
                                <div>
                                    <h4 className="text-base font-bold">{video?.title}</h4>
                                    <div className="flex items-center gap-2 text-xs">
                                    <p className="text-xs font-normal">{video?.owner[0].fullName}</p>
                                        <span className="bg-white rounded-full w-1 h-1"></span>
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
        </div>
    );
}
