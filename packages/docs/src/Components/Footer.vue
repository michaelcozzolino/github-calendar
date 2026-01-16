<template>
    <!--        todo: replace with footer component from flyonui-vue -->
    <footer class="mt-auto footer footer-center bg-info/40 py-4">
        <aside>
            <p class="flex gap-2">
                Made With

                <!--                     todo: color to be added in flyonui-vue -->
                <FoIcon class="text-error"
                        icon="line-md:heart-filled"
                />

                By

                <FoLink to="https://github.com/michaelcozzolino"
                        underline-effect="hover-animated"
                >
                    Michael Cozzolino
                </FoLink>
                - © 2025
            </p>
        </aside>
    </footer>
</template>

<script setup lang="ts">
import { FoIcon, FoLink } from 'flyonui-vue';
</script>
