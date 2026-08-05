import {useContext, useEffect} from "react";
import {UserContext} from "../../../kernel/context/user.tsx";

function VideoLookupBar() {

    // @ts-ignore
    const { user , setUser} = useContext(UserContext);

    useEffect(() => {
        const cachedUser = localStorage.getItem("youtube-user:user");
        if(cachedUser){
            setUser(JSON.parse(cachedUser));
        }
    }, []);
    return (
        <div className="w-full h-20 pr-5 pl-3 flex items-center justify-between">
            <div className="cursor-pointer hover:bg-gray-600 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/></svg>
            </div>
            <div className="flex items-center justify-center gap-5">
                <div className="w-[40rem] border border-gray-200/60 rounded-4xl flex items-center justify-between h-full  pl-5">
                    <input className="focus:outline-none h-10 w-full" placeholder="Search"/>
                    <div className="bg-gray-600 h-10 w-16 rounded-r-full flex items-center justify-center hover:brightness-125 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                    </div>
                </div>
                <div className="bg-gray-600 p-3 rounded-full hover:brightness-125 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"/></svg>
                </div>
            </div>
            <div>
                <img src={user?.avatar} alt="profile image" className="w-10 h-10 rounded-full"/>
            </div>
        </div>
    );
}

export default VideoLookupBar;
