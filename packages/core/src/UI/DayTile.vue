<template>
    <div v-if="day === null"
         :class="sizeClass"
    />

    <FoLink v-else
            :to="contributionsOverviewUrl"
            class="rounded-sm cursor-pointer transition hover:bg-info"
            :class="[sizeClass, useGitHubLevelColor(day.level)]"
            :title="`${formattedDate} - ${day.count} contributions`"
    />
</template>

<script setup lang="ts">
import type { GitHubDateContribution } from '@/Types/GitHubCalendar';
import { FoLink }                      from 'flyonui-vue';
import { computed }                    from 'vue';
import { formatDate }                  from '@/Lib/FormatDate';
import { useGitHub }                   from '@/Lib/UseGitHub';
import { useGitHubLevelColor }         from '@/Lib/UseGitHubLevelColor';

interface Props {
    username: string;
    day:      GitHubDateContribution | null;
}

const props = defineProps<Props>();

const sizeClass: string = 'w-3 h-3';

const formattedDate = computed((): string => {
    return props.day === null ? '' : formatDate(props.day.date).value;
});

const { useContributionsOverviewUrl } = useGitHub(() => props.username);

const contributionsOverviewUrl = useContributionsOverviewUrl(formattedDate, formattedDate);
</script>
