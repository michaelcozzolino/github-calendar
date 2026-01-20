<template>
    <!--    todo: these colors come from github and it might be better to have them in specific tw variables -->
    <div class="flex gap-3 text-secondary text-xs bg-[#0d1117] p-4 rounded-2xl border-2 border-[#3d444d]">
        <div class="flex flex-col gap-1 mr-2 pt-6">
            <AxisLabel v-for="(day, i) in DAYS"
                       :key="day"
                       class="h-3 leading-3 "
                       :label="(i + 1) % 2 === 0 ? day.slice(0, 3) : undefined"
            />
        </div>

        <div class="flex flex-col">
            <div class="flex gap-1 mb-2 h-4">
                <AxisLabel v-for="(month, i) in monthLabels"
                           :key="month?.label ?? i"
                           :label="month?.label"
                           :to="month === null ? undefined : useContributionsOverviewUrl(month.startingDate).value"
                           underline-effect="no-underline"
                />
            </div>

            <div class="flex gap-1">
                <div v-for="(week, i) in contributionsByWeeks"
                     :key="i"
                     class="flex flex-col gap-1"
                >
                    <DayTile v-for="(day, j) in week"
                             :key="day?.date.toString() ?? `${i}-${j}`"
                             :username="username"
                             :day="day"
                    />
                </div>
            </div>

            <div class="flex place-content-between my-4">
                <FoLink :to="profileUrl"
                        class="pb-1"
                        underline-effect="hover-animated"
                >
                    <div class="flex gap-2">
                        <div class="avatar">
                            <div class="size-5 rounded-full">
                                <img :src="profilePicUrl"
                                     :alt="username"
                                >
                            </div>
                        </div>

                        {{ username }}
                    </div>
                </FoLink>

                <Legend />
            </div>

            <GitHubStatistics :contributions="contributionsByWeeks" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type {
    GitHubCalendarProps,
    GitHubContribution,
    GitHubContributionLevel,
    GitHubDateContribution,
}                                     from '@/Types/GitHubCalendar';
import { useArrayMap, useDateFormat } from '@vueuse/core';
import { FoLink }                     from 'flyonui-vue';
import { sleep }                      from 'sleepjs';
import { computed }                   from 'vue';
import Api                            from '@/Lib/Api';
import { DAYS, MONTHS }               from '@/Lib/DateConstants';
import { formatDate }                 from '@/Lib/FormatDate';
import { useGitHub }                  from '@/Lib/UseGitHub';
import AxisLabel                      from '@/UI/AxisLabel.vue';
import DayTile                        from '@/UI/DayTile.vue';
import GitHubStatistics               from '@/UI/GitHubStatistics.vue';
import Legend                         from '@/UI/Legend.vue';

type HeatMapContribution = [string, { count: number; level: GitHubContributionLevel }]; // The string is the date

const props = defineProps<GitHubCalendarProps>();

const { useContributionsOverviewUrl, profileUrl, profilePicUrl } = useGitHub(() => props.username);

const contributionsDateRange = computed((): { start: Date; end: Date } => {
    const isFromDate = isDate(props.from);
    const start      = isFromDate ? props.from : new Date(props.from, 0, 1);
    const end        = new Date(start);

    end.setFullYear(start.getFullYear() + 1);

    /**
     * In case it is an year we want the date to be from the 1st january to the 31st december and not to
     * the 1st january of the next year
     */
    if (isFromDate === false) {
        end.setDate(end.getDate() - 1);
    }

    return { start, end };
});

// Fast sleep for better user experience
await sleep(1500);

const { data } = await Api.getGitHubContributions(
    () => props.username,
    () => [contributionsDateRange.value.start.getFullYear(), contributionsDateRange.value.end.getFullYear()],
    {
        // todo: implement something nicer
        onError: () => console.warn('error occurred'),
    },
);

const contributions = useArrayMap(
    (): GitHubContribution[] => data.value.contributions,
    ({ date, count, level }: GitHubContribution): HeatMapContribution => ([date, { count, level }]),
);

const contributionsByWeeks = computed((): (GitHubDateContribution | null)[][] => {
    const map = new Map(contributions.value);

    const { start, end } = contributionsDateRange.value;
    const startDayIndex  = start.getDay();

    const weeks: (GitHubDateContribution | null)[][] = [];

    /**
     * The first contribution might not start from the first day so we have to fill the contributions with null values
     */
    let current: (GitHubDateContribution | null)[] = Array.from<null>({ length: startDayIndex }).fill(null);

    for (
        let currentDate = new Date(start);
        currentDate <= end;
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
    ) {
        const formattedDate = useDateFormat(currentDate, 'YYYY-MM-DD').value;
        const value         = map.get(formattedDate);

        current.push({
            date:  new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
            count: value?.count ?? 0,
            level: value?.level ?? 0,
        });

        if (
            /**
             * In relation to the null that have been filled at the beginning, now when we reach the last week
             * we have to fill the gap with the last remaining days.
             * The offsets are related to having the whole year if a year is specified or a range from the date of a year
             * to the date of the next year.
             */
            (+currentDate === +end && current.length === startDayIndex + (isDate(props.from) ? 2 : 1))
            || current.length === 7
        ) {
            weeks.push(current);
            current = [];
        }
    }

    return weeks;
});

interface LabellableMonth {
    label:        string;
    startingDate: string;
}

const monthLabels = computed((): (LabellableMonth | null)[] => {
    const data: (LabellableMonth | null)[] = [];
    let currentMonthIndex: number          = -1;

    for (let i = 0; i < contributionsByWeeks.value.length; i++) {
        const contribution = contributionsByWeeks.value?.[i]?.[0];

        if (contribution === null) {
            data.push(null);

            continue;
        }

        const date = contribution?.date;

        if (date === undefined) {
            throw new Error('date not found');
        }

        const monthIndex = date.getMonth();

        if (monthIndex !== currentMonthIndex) {
            currentMonthIndex = monthIndex;
            const month       = MONTHS[monthIndex];

            if (month === undefined) {
                throw new Error(`Month at index ${monthIndex} not found`);
            }

            data.push({
                label:        month,
                startingDate: formatDate(date).value,
            });

            continue;
        }

        data.push(null);
    }

    return data;
});

function isDate(maybeDate: Date | number): maybeDate is Date {
    return maybeDate instanceof Date;
}
</script>
