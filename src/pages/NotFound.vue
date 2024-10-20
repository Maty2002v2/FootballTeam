<template>
    <div class="not-found">
        <SomethingWentWrong :tryAgainFunction="goToHome">
            <template #buttonText>
                Back to homepage
            </template>
        </SomethingWentWrong>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import SomethingWentWrong from '../components/SomethingWentWrong.vue';

const router = useRouter();
const goToHome = () => {
    router.push('/');
}
</script>
