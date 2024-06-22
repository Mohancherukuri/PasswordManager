export const appListData = [
    { id: "e3fasdf", title: "Facebook" },
    { id: "a2hdfg3", title: "Instagram" },
    { id: "i9skl23", title: "Twitter" },
    { id: "b1dfm45", title: "LinkedIn" },
    { id: "p0azm12", title: "Snapchat" },
    { id: "q8bzn98", title: "TikTok" },
    { id: "w3nlk32", title: "YouTube" },
    { id: "l0sfg56", title: "Netflix" },
    { id: "g5mhj21", title: "Amazon" },
    { id: "h4pqo23", title: "Spotify" },
    { id: "h4pqo243", title: "Fallulu" },

];

// Define a type for each item in the array
export type AppItem = {
    id: string;
    title: string;
    selected: boolean;
};

// Map over the original array and add 'selected: false' to each item
export const appListDataWithSelection: AppItem[] = appListData.map(item => ({
    ...item,
    selected: false,
}));
