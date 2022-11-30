import PopupWithForm from './PopupWithForm';
import Input from './Input';
import useField from '../hooks/useField';
import useForm from '../hooks/useForm';
import { validateProfile } from 'utils/utils';
import { useContext } from 'react';
import { CurrentUserContext } from 'contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonContent }) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about } = currentUser;
  const form = useForm({ name, about }, onUpdateUser, validateProfile);
  const nameField = useField('name', name, form);
  const aboutField = useField('about', about, form);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonContent={buttonContent}
      onSubmit={form.handleSubmit}
      hasErrors={!form.noErrors}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Input
        type="text"
        id="name-input"
        inputname="name"
        value={nameField.value}
        placeholder="Имя"
        onChange={nameField.handleChange}
        onBlur={nameField.handleBlur}
        onFocus={nameField.handleFocus}
        hasErrors={nameField.error}
        errorMessage={nameField.error}
        maxLength="40"
      />
      <Input
        type="text"
        id="about-input"
        inputname="about"
        value={aboutField.value}
        placeholder="О себе"
        onChange={aboutField.handleChange}
        onBlur={aboutField.handleBlur}
        onFocus={aboutField.handleFocus}
        hasErrors={aboutField.error}
        errorMessage={aboutField.error}
        maxLength="200"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
