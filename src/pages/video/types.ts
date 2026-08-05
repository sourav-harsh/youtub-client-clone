export interface IVideo {
    _id: string,
    videoFile: string,
    thumbnail: string,
    title: string,
    description: string,
    duration: number,
    views: number,
    isPublished: boolean,
    owner: Array<IOwner>,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface IOwner {
    _id: string,
    name: string,
    avatar: string,
    fullName: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}
export interface ISubscriber {
    _id: string,
    subscriber:string,
    channel:string,
    createdAt: string,
    updatedAt: string,
    __v: number
}
