import Popup from './Popup';

function PopupWithForm({
  name,
  title,
  children,
  buttonContent,
  onSubmit,
  hasErrors,
  isOpen,
  onClose,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} type="form" name={name}>
      <form className="form" name={`${name}`} noValidate onSubmit={onSubmit}>
        <h2 className="form__title">{title}</h2>
        {children}
        <button
          type="submit"
          className={`form__save-button form__save-button_content_${name} ${
            hasErrors ? 'form__save-button_disabled' : ''
          }`}
          disabled={hasErrors}
        >
          {buttonContent}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
