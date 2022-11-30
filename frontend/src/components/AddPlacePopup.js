import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { validateCard } from 'utils/utils';
import useField from '../hooks/useField';
import useForm from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonContent }) {
  const form = useForm({ name: '', link: '' }, onAddPlace, validateCard);
  const titleField = useField('name', '', form);
  const linkField = useField('link', '', form);

  const isButtonDisabled =
    titleField.value === '' || linkField.value === '' || form.noErrors === false;

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonContent={buttonContent}
      onSubmit={form.handleSubmit}
      hasErrors={isButtonDisabled}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Input
        type="text"
        id="card-name-input"
        inputname="name"
        value={titleField.value}
        placeholder="Название"
        onChange={titleField.handleChange}
        onBlur={titleField.handleBlur}
        onFocus={titleField.handleFocus}
        hasErrors={titleField.error}
        errorMessage={titleField.error}
        maxLength="30"
      />
      <Input
        type="url"
        id="link-input"
        inputname="link"
        value={linkField.value}
        placeholder="Ссылка на картинку"
        onChange={linkField.handleChange}
        onBlur={linkField.handleBlur}
        onFocus={linkField.handleFocus}
        hasErrors={linkField.error}
        errorMessage={linkField.error}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
