import Popup from './Popup';
function InfoTooltip({ registered, isOpen, onClose }) {
  const successText = 'Вы успешно зарегистрировались!';
  const errorText = 'Что-то пошло не так! Попробуйте ещё раз.';
  return (
    <Popup isOpen={isOpen} onClose={onClose} type="form" name="tooltip">
      <div
        className={`popup__sign ${
          registered ? 'popup__sign_type_success' : 'popup__sign_type_error'
        }`}
      ></div>
      <span className="popup__info">{registered ? successText : errorText}</span>
    </Popup>
  );
}
export default InfoTooltip;
