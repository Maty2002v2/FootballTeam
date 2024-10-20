<template>
    <div v-show="showModal" class="backdrop"></div>
    <Transition name="slide">
        <div v-if="showModal">
            <div ref="modal" class="modal">
                <div class="modal__header">
                    <h3 class="modal__title">
                        <slot name="title" />
                    </h3>
                    <Plus class="close-button" color="#4b5563" @click="closeModal" />
                </div>
                <div class="modal__content">
                    <slot name="content" />
                </div>
                <div class="modal__actions">
                    <slot name="actions">
                        <Button type="button" @click="closeModal">
                            <slot name="cancelButton">Cancel</slot>
                        </Button>
                        <Button type="button" @click="saveAction">
                            <slot name="saveButton">Save</slot>
                        </Button>
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';
import { Plus } from 'lucide-vue-next';
import { onClickOutside } from '@vueuse/core';
import Button from './Button.vue';

interface Props {
    showModal: boolean;
}

withDefaults(defineProps<Props>(), {
    showModal: false,
});

const emit = defineEmits(['closeModal', 'saveAction'])

const closeModal = () => {
    emit('closeModal')
}

const saveAction = () => {
    emit('saveAction');
}

const modal = useTemplateRef('modal');
onClickOutside(modal, () => closeModal());
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: bottom 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  bottom: -500px;
}

// .v-enter-active,
// .v-leave-active {
//     transition: bottom 0.3s ease-in-out;
// }

// .v-enter-from,
// .v-leave-to {
//     bottom: -500px;
// }

.backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5vh;
    background-color: rgba(63, 62, 62, 0.3);
}

.modal {
    position: fixed;
    top: unset;
    left: 0px;
    bottom: 0px;

    display: flex;
    flex-direction: column;
    gap: 30px;
    width: calc(100% - 40px);
    height: fit-content;
    padding: 20px;
    border-radius: 3px 3px 0px 0px;

    background-color: #ffffff;

    box-shadow: 0px -4px 4px 0px rgba(117, 117, 117, 0.2);
    transform: unset;

    @include breakpoint(md) {
        position: relative;
        top: 50%;
        left: 50%;
        height: fit-content;
        width: 960px;
        transform: translate(-50%, -50%);
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
    }

    &__title {
        margin: 0;
        color: #494F62;
    }

    .close-button {
        transform: rotate(45deg);
        cursor: pointer;
    }

    &__actions {
        display: flex;
        justify-content: flex-end;
        gap: 20px;
    }
}
</style>
