<template>
    <form @submit.prevent="lastRetrievedUser = user">
        <FoJoin>
            <FoSocialButton social="Github"
                            :to="`https://github.com/${lastRetrievedUser}`"
                            shape="square"
            />

            <FoInputText v-model="user"
                         icon="majesticons:user-line"
            />

            <FoButton type="submit"
                      color="primary"
            >
                Show calendar
            </FoButton>
        </FoJoin>
    </form>
</template>

<script setup lang="ts">
import { FoButton, FoInputText, FoJoin, FoSocialButton } from 'flyonui-vue';

const user              = defineModel<string>('user', { required: true });
const lastRetrievedUser = defineModel<string>('lastRetrievedUser', { required: true });
</script>
