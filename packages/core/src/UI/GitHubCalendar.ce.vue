<template>
    <Suspense>
        <SuspensibleGitHubCalendar :username="username"
                                   :year="year"
        />

        <template #fallback>
            <!--            todo: this should probably be used in ce mode as the color style is not taken -->
            <FoLoading color="primary" />
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import type { GitHubCalendarProps } from '@/Types/GitHubCalendar.ts';
import { FoLoading }                from 'flyonui-vue';
import SuspensibleGitHubCalendar    from '@/UI/SuspensibleGitHubCalendar.vue';

defineProps<GitHubCalendarProps>();
</script>
