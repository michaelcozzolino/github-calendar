<template>
    <Suspense :key="count">
        <SuspensibleGitHubCalendar :username="username"
                                   :from="from"
        />

        <template #fallback>
            <!--            todo: this should probably be used in ce mode as the color style is not taken -->
            <FoLoading color="primary" />
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import type { GitHubCalendarProps } from '@/Types/GitHubCalendar';
import { FoLoading }                from 'flyonui-vue';
import { ref, watch }               from 'vue';
import SuspensibleGitHubCalendar    from '@/UI/SuspensibleGitHubCalendar.vue';

const props = defineProps<GitHubCalendarProps>();

const count = ref<number>(0);

watch(() => props.from, () => {
    if (typeof props.from === 'number' && Number.isInteger(props.from) === false) {
        throw new TypeError(`When specifying a year, "from" must be an integer. ${props.from} given.`);
    }
}, { immediate: true });

watch(() => props.from, () => count.value++);
</script>
