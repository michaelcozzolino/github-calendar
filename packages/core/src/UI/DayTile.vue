<template>
    <div v-if="day === null"
         :class="sizeClass"
    />

    <!--                     to be replaced with fo link -->
<!--    todo: the github url can be put in some constants -->
    <a v-else
       :href="`https://github.com/${username}?tab=overview&from=${formattedDate}&to=${formattedDate}`"
       class="rounded-sm cursor-pointer transition hover:bg-info"
       :class="[sizeClass, useGitHubLevelColor(day.level)]"
       :title="`${formattedDate} - ${day.count} contributions`"
    />
</template>

<script setup lang="ts">
import type { GitHubDateContribution } from '@/Types/GitHubCalendar';
import { useGitHubLevelColor }         from '@/Lib/UseGitHubLevelColor';
import { formatDate }                  from "@/Lib/FormatDate.ts";
import { computed }                    from "vue";

interface Props {
    username: string;
    day: GitHubDateContribution | null;
}

const props = defineProps<Props>();

const sizeClass: string = 'w-3 h-3';

const formattedDate = computed((): string => {
    return props.day === null ? '' : formatDate(props.day.date).value
});
</script>
