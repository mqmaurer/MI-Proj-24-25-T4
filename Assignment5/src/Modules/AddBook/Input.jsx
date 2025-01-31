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
