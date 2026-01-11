<template>
    <div class="flex gap-2 place-content-center">
        Less

        <div v-for="level in levels"
             :key="level"
             class="w-3 h-3 rounded-sm"
             :class="useGitHubLevelColor(level)"
        />

        More
    </div>
</template>

<script setup lang="ts">
import type { GitHubContributionLevel } from '@/Types/GitHubCalendar';
import { useGitHubLevelColor }          from '@/Lib/UseGitHubLevelColor';

const levels: GitHubContributionLevel[] = [0, 1, 2, 3, 4];
</script>
