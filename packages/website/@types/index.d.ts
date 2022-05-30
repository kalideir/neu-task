export interface IPost {
    id: string;
    title: string
    body: string
    userId: string

}

export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface GetPostsQueryData {
    posts: IPost[];
}


export interface GetUserQueryData {
    user: IUser;
}

export interface GetUserVars {
    id: string
}

  