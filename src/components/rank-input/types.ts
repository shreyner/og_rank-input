type Points = {
    count: number;
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
