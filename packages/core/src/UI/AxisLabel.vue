<template>
    <FoLink v-if="label !== undefined && to !== undefined"
            :class="elementClass"
            :to="to"
            underline-effect="no-underline"
    >
        {{ label }}
    </FoLink>

    <div v-else
         :class="elementClass"
    >
        {{ label ?? '' }}
    </div>
</template>

<script setup lang="ts">
import { FoLink } from 'flyonui-vue';

interface Props {
    label?: string;
    to?:    string;
}

defineProps<Props>();

const elementClass = 'w-3 text-left';
</script>
