<template>
    <!--    todo: maybe the text-base is not needed if it is a bug in flyonui https://github.com/themeselection/flyonui/pull/137 -->
    <div class="grid grid-cols-2 gap-4">
        <template v-for="(statRow, index) in statRows"
                  :key="index"
        >
            <FoStats is-bordered
                     orientation="vertical"
            >
                <FoStat v-for="stat in statRow"
                        :key="stat.title"
                >
                    <div class="text-center">
                        <FoStatTitle class="text-base text-info">
                            {{ stat.title }}
                        </FoStatTitle>

                        <FoStatValue class="text-primary">
                            {{ stat.value }}
                        </FoStatValue>
                    </div>
                </FoStat>
            </FoStats>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { GithubContributionStat, GitHubDateContribution } from '@/Types/GitHubCalendar';
import { FoStat, FoStats, FoStatTitle, FoStatValue }           from 'flyonui-vue';
import { computed }                                            from 'vue';
import { DAYS }                                                from '@/Lib/DateConstants';
import { formatDate }                                          from '@/Lib/FormatDate';

interface Props {
    contributions: (GitHubDateContribution | null)[][];
}

const props = defineProps<Props>();

const statRows = computed((): GithubContributionStat[][] => {
    let stat: GithubContributionStat[][] = [];

    let totalContributions: number     = 0;
    let maxContributionsStreak: number = 0;
    let currentStreak: number          = 0;

    const totalContributionsByDay: { [day: string]: number }   = Object.fromEntries(DAYS.map(day => [day, 0]));
    const totalContributionsByDate: { [date: string]: number } = {};

    for (const contribution of props.contributions.flat()) {
        if (contribution === null) {
            continue;
        }

        const { date, count } = contribution;

        totalContributions += count;

        const day = getDay(date.getDay());

        if (totalContributionsByDay[day] === undefined) {
            throw new Error(`Day ${day} not found in totalContributionsByDay.`);
        }

        totalContributionsByDay[day] += count;

        if (count > 0) {
            currentStreak += 1;

            if (currentStreak > maxContributionsStreak) {
                maxContributionsStreak = currentStreak;
            }
        } else {
            currentStreak = 0;
        }

        totalContributionsByDate[formatDate(date).value] = count;
    }

    stat = stat.concat([
        [
            {
                title: 'Total Contributions',
                value: totalContributions,
            },
            {
                title: 'Max contributions streak',
                value: maxContributionsStreak,
            },
        ],
        [
            {
                title: 'Most contributed day ',
                value: formatStatDate(
                    Object.entries(totalContributionsByDay).reduce(maxContributionsAccumulator, ['', 0],
                    ),
                ),
            },
            {
                title: 'Most contributed date',
                value: formatStatDate(
                    Object.entries(totalContributionsByDate).reduce(maxContributionsAccumulator, ['', 0]),
                ),
            },
        ],
    ]);

    return stat;
});

function getDay(index: number): string {
    const day = DAYS[index];

    if (day === undefined) {
        throw new Error(`Day at index ${index} does not exist.`);
    }

    return day;
}

function maxContributionsAccumulator(
    [maxDate, maxCount]: [string, number],
    [date, count]: [string, number],
): [string, number] {
    return count > maxCount ? [date, count] : [maxDate, maxCount];
}

function formatStatDate(stat: [string, number]): string {
    return `${stat[0]} (${stat[1]})`;
}
</script>
