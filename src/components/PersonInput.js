import './PersonInput.css'

function PersonInput(props) {
  const { name, type, placeholder, label, required, pattern, step, onChange, value } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        step={step}
        onChange={onChange}
      />
    </div>
  );
}

export default PersonInput;
