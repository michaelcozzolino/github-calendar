<template>
    <div class="min-h-screen flex flex-col w-full">
        <div class="grid gap-4">
            <div class="grid place-items-center content-center gap-4">
                <Header />

                <UserRetrievalForm v-model:user="currentUser"
                                   :last-retrieved-user="lastRetrievedUser"
                                   @update:last-retrieved-user="lastRetrievedUser = $event"
                />

                <!--                    todo: resize for mobile -->
                <div class="px-4">
                    <github-calendar .username="lastRetrievedUser"
                                     .from="2025"
                    />
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ref }           from 'vue';
import Footer            from '@/Components/Footer.vue';
import Header            from '@/Components/Header.vue';
import UserRetrievalForm from '@/Components/UserRetrievalForm.vue';

// todo: in some ways i must get the input from flyonui-vue for it to focus on a button click (try it out)
// const usernameInputComponent = useTemplateRef('usernameInput');
// const { focused: isUsernameInputFocused } = useFocus(usernameInputComponent);

const initialUsername: string = 'michaelcozzolino';
const currentUser             = ref<string>(initialUsername);
const lastRetrievedUser       = ref<string>(initialUsername);
</script>
