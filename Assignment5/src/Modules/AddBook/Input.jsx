/**
 * A text input component for form fields.
 *
 * @param {Object} prop - The prop for the input component.
 * @param {string} prop.label - The label text for the input field.
 * @param {string} prop.id - The unique id for the input element.
 * @param {string} prop.value - The current value of the input field.
 * @param {function} prop.onChange - The callback function to handle input changes.
 * @param {string} [prop.type="text"] - The type of the input field (default is "text").
 *
 * @returns {JSX.Element} A labeled input field.
 */
const TextInput = ({ label, id, value, onChange, type = "text" }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
