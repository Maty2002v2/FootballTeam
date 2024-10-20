import { ref } from 'vue';
import { useModal } from './useModal';

const { modalState, openModal, closeModal } = useModal();

const avatarLink = ref<string | undefined>();

const closeLoadAvatarModal = () => {
  closeModal();
};

const openLoadAvatarModal = (_event: Event, link?: string) => {
  if (link) {
    avatarLink.value = link;
  }

  openModal();
};

const isVlidAvatarLink = (link: string): boolean => {
  const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
  return regex.test(link);
}

export const useLoadAvatarModal = () => {
  return {
    avatarLink,
    loadAvatarModalState: modalState,
    openLoadAvatarModal,
    closeLoadAvatarModal,
    isVlidAvatarLink,
  };
};
