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
    },
    {
        id: 8,
        title: "Mock Post 8",
        body: "This is the body of Mock Post 8",
        userId: 7
    },
    {
        id: 9,
        title: "Mock Post 9",
        body: "This is the body of Mock Post 9",
        userId: 8
    },
    {
        id: 10,
        title: "Mock Post 10",
        body: "This is the body of Mock Post 10",
        userId: 9
    },
    {
        id: 11,
        title: "Mock Post 11",
        body: "This is the body of Mock Post 11",
        userId: 10
    },
    {
        id: 12,
        title: "Mock Post 12",
        body: "This is the body of Mock Post 12",
        userId: 11
    },
    {
        id: 13,
        title: "Mock Post 13",
        body: "This is the body of Mock Post 13",
        userId: 12
    },
    {
        id: 14,
        title: "Mock Post 14",
        body: "This is the body of Mock Post 14",
        userId: 13
    },
    {
        id: 15,
        title: "Mock Post 15",
        body: "This is the body of Mock Post 15",
        userId: 14
    },
    {
        id: 16,
        title: "Mock Post 16",
        body: "This is the body of Mock Post 16",
        userId: 15
    },
    {
        id: 17,
        title: "Mock Post 17",
        body: "This is the body of Mock Post 17",
        userId: 16
    },
    {
        id: 18,
        title: "Mock Post 18",
        body: "This is the body of Mock Post 18",
        userId: 17
    },
    {
        id: 19,
        title: "Mock Post 19",
        body: "This is the body of Mock Post 19",
        userId: 18
    },
    {
        id: 20,
        title: "Mock Post 20",
        body: "This is the body of Mock Post 20",
        userId: 19
    },
    {
        id: 21,
        title: "Mock Post 21",
        body: "This is the body of Mock Post 21",
        userId: 20
    },
    {
        id: 22,
        title: "Mock Post 22",
        body: "This is the body of Mock Post 22",
        userId: 21
    },
    {
        id: 23,
        title: "Mock Post 23",
        body: "This is the body of Mock Post 23",
        userId: 22
    },
    {
        id: 24,
        title: "Mock Post 24",
        body: "This is the body of Mock Post 24",
        userId: 23
    },
    {
        id: 25,
        title: "Mock Post 25",
        body: "This is the body of Mock Post 25",
        userId: 24
    },
    {
        id: 26,
        title: "Mock Post 26",
        body: "This is the body of Mock Post 26",
        userId: 25
    },
    {
        id: 27,
        title: "Mock Post 27",
        body: "This is the body of Mock Post 27",
        userId: 26
    },
    {
        id: 28,
        title: "Mock Post 28",
        body: "This is the body of Mock Post 28",
        userId: 27
    },
    {
        id: 29,
        title: "Mock Post 29",
        body: "This is the body of Mock Post 29",
        userId: 28
    },
    {
        id: 30,
        title: "Mock Post 30",
        body: "This is the body of Mock Post 30",
        userId: 29
    },
    {
        id: 31,
        title: "Mock Post 31",
        body: "This is the body of Mock Post 31",
        userId: 30
    },
    {
        id: 32,
        title: "Mock Post 32",
        body: "This is the body of Mock Post 32",
        userId: 31
    }
];

type FetchPostsReturn = {
    posts: Post[];
    nextIdx: number;
};

async function fetchMockPosts({
    pageParam
}: {
    pageParam: number;
}): Promise<FetchPostsReturn> {
    return new Promise((resolve) => {
        var startingIdx = pageParam * 5;
        setTimeout(
            () =>
                resolve({
                    posts: posts.slice(startingIdx, startingIdx + 5),
                    nextIdx:
                        posts.length - 1 >= startingIdx + 5
                            ? pageParam + 1
                            : -1
                }),
            500
        );
    });
}

async function createMockPost(post: Post): Promise<Post> {
    return new Promise((resolve) => {
        setTimeout(() => {
            posts.push(post);
            resolve(post);
        }, 500);
    });
}

function getPostById(id: number): Promise<Post | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const post = posts.find((post) => post.id === id);
            resolve(post);
        }, 1000);
    });
}

export { fetchMockPosts, getPostById, createMockPost };
