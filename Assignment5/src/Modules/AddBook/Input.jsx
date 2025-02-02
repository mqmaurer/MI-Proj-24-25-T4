/**
 * A text input component for form fields.
 *
 * @param {Object} props - The props for the input component.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.id - The unique id for the input element.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - The callback function to handle input changes.
 * @param {string} [props.type="text"] - The type of the input field (default is "text").
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
