import './PersonSelect.css'

function PersonSelect(props) {
  const { name } = props;

  return (
    <option name={name}>{name}</option>          
  );
}

export default PersonSelect;
