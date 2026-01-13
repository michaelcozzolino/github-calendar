export interface GitHubCalendarProps {
    username: string;
    from:     Date | number; // When number it is a year
}

export type GitHubContributionLevel = 0 | 1 | 2 | 3 | 4;

interface GitHubContributionStats {
    count: number;
    level: GitHubContributionLevel;
}

export interface GitHubContribution extends GitHubContributionStats {
    date: string;
}

export interface GitHubDateContribution extends GitHubContributionStats {
    date: Date;
}

export interface GitHubContributionsResponse {
    total: {
        [year: number]: number;
        [year: string]: number; // 'lastYear;
    };
    contributions: Array<GitHubContribution>;
}

interface ErrorResponse {
    error:   string;
    issues?: Array<{
        code:    string;
        path:    string;
        message: string;
    }>;
}

export interface GithubContributionStat {
    title: string;
    value: string | number;
}
