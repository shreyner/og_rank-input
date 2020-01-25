type Points = {
    count: number;
    name?: string;
    step?: number;
};

export type Rank = {
    name: string;
    rank?: Array<Rank>;
    points?: Points;
}

export type RankScheme = {
    pointName: string;
    rank: Array<Rank>
}
