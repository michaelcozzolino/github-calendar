<template>
    <!--    todo: maybe the text-base is not needed if it is a bug in flyonui https://github.com/themeselection/flyonui/pull/137 -->
    <FoStats is-bordered>
        <FoStat v-for="stat in stats"
                :key="stat.title"
        >
            <div class="text-center">
                <FoStatTitle class="text-base">
                    {{ stat.title }}
                </FoStatTitle>

                <FoStatValue>
                    {{ stat.value }}
                </FoStatValue>
            </div>
        </FoStat>
    </FoStats>
</template>

<script setup lang="ts">
import type { GithubContributionStat }               from '@/Types/GitHubCalendar';
import { FoStat, FoStats, FoStatTitle, FoStatValue } from 'flyonui-vue';

interface Props {
    stats: GithubContributionStat[];
}

defineProps<Props>();
</script>
