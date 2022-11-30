import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { useRef } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonContent }) {
  const avatarInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
    avatarInput.current.value = '';
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonContent={buttonContent}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Input
        type="url"
        id="avatar-input"
        inputname="avatar"
        placeholder="Ссылка на картинку"
        inputRef={avatarInput}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
