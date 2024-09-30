import { Post } from "../types";

let posts: Post[] = [
    {
        id: 1,
        title: "Mock Post 1",
        body: "This is the body of Mock Post 1",
        userId: 1
    },
    {
        id: 2,
        title: "Mock Post 2",
        body: "This is the body of Mock Post 2",
        userId: 1
    },
    {
        id: 3,
        title: "Mock Post 3",
        body: "This is the body of Mock Post 3",
        userId: 2
    },
    {
        id: 4,
        title: "Mock Post 4",
        body: "This is the body of Mock Post 4",
        userId: 3
    },
    {
        id: 5,
        title: "Mock Post 5",
        body: "This is the body of Mock Post 5",
        userId: 4
    },
    {
        id: 6,
        title: "Mock Post 6",
        body: "This is the body of Mock Post 6",
        userId: 5
    },
    {
        id: 7,
        title: "Mock Post 7",
        body: "This is the body of Mock Post 7",
        userId: 6
    }
];

export async function fetchMockPosts(): Promise<Array<Post>> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(posts), 500);
    });
}

export async function createMockPost(post: Post): Promise<Post> {
    return new Promise((resolve) => {
        setTimeout(() => {
            posts.push(post);
            resolve(post);
        }, 500);
    });
}

export function getPostById(id: number): Promise<Post | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const post = posts.find((post) => post.id === id);
            resolve(post);
        }, 1000);
    });
}
