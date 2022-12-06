import Popup from './Popup';
function InfoTooltip({ registered, isOpen, onClose, text }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} type="form" name="tooltip">
      <div
        className={`popup__sign ${
          registered ? 'popup__sign_type_success' : 'popup__sign_type_error'
        }`}
      ></div>
      <span className="popup__info">{text}</span>
    </Popup>
  );
}
export default InfoTooltip;
