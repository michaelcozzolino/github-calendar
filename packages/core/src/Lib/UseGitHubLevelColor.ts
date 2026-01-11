import type { GitHubContributionLevel } from '@/Types/GitHubCalendar';

// todo: this can be also a record
export function useGitHubLevelColor(level: GitHubContributionLevel): string {
    switch (level) {
        case 0:
            return 'bg-[#151b23]';

        case 1:
            return 'bg-[#033a16]';

        case 2:
            return 'bg-[#196c2e]';

        case 3:
            return 'bg-[#2ea043]';

        default:
            return 'bg-[#2ea043]';
    }
}
