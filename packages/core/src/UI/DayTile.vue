<template>
    <!--                     to be replaced with fo link -->
    <a :href="`https://github.com/${username}?tab=overview&from=${formattedDate}&to=${formattedDate}`"
       class="w-3 h-3 rounded-sm cursor-pointer transition"
       :class="useGitHubLevelColor(day.level)"
       :title="`${formattedDate} - ${day.count} contributions`"
    />
</template>

<script setup lang="ts">
import type { GitHubDateContribution } from '@/Types/GitHubCalendar';
import { useGitHubLevelColor }         from '@/Lib/UseGitHubLevelColor';
import { formatDate }                  from "@/Lib/FormatDate.ts";

interface Props {
    username: string;
    day: GitHubDateContribution;
}

const props = defineProps<Props>();

const formattedDate = formatDate(() => props.day.date);
</script>
