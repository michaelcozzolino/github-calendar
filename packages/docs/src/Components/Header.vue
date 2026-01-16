<template>
    <div class="grid place-items-center gap-4 pt-4">
        <FoHeading level="1"
                   class="z-1 leading-[1.15] font-bold md:max-w-3xl md:text-balance"
        >
            GitHub
            <span class="text-primary">Contributions</span>
            Calendar
        </FoHeading>

        <FoHeading level="4"
                   class="text-info!"
        >
            A fully customizable Vue 3 component to display GitHub-style contribution calendars.
        </FoHeading>

        <div class="flex gap-4">
            <!--                    todo -->
            <!--                    <FoButton color="primary" -->
            <!--                              @click.prevent="isUsernameInputFocused = true" -->
            <!--                    > -->
            <!--                        Try it out -->
            <!--                    </FoButton> -->

            <FoSocialButton social="Github"
                            to="https://github.com/michaelcozzolino/github-calendar"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { FoHeading, FoSocialButton } from 'flyonui-vue';
</script>
