interface Routes {
    [key: string]: {
        path: string;
        title?: string;
    }
}

export const routes: Routes = {
    home: {
        path: "/",
        title: "Home"
    },
    login: {
        path: "/login",
        title: "Login"
    },
    register: {
        path: "/register",
        title: "Register"
    },
    nft: {
        path: "/nft",
        title: "NFT"
    },
    post: {
        path: "/post",
        title: "Post"
    },
    mint: {
        path: "/mint",
        title: "Mint"
    },
    candyshop: {
        path: "/candyshop",
        title: "Candyshop"
    },
    auctionhouse: {
        path: "/auctionhouse",
        title: "Auction House"
    },
    gumballmachine: {
        path: "/gumballmachine",
        title: "Gumball Machine"
    },
    nudeswap: {
        path: "/nudeswap",
        title: "NudeSwap"
    }
};