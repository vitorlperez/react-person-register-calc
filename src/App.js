import { useState } from 'react';
import './App.css';
import PersonInput from './components/PersonInput';
import PersonSelect from './components/PerosonSelect';
import PersonTable from './components/PersonTable';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    cpf: '',
    height: '',
    weight: '',
    sex: '',
  });

  const [isUpdate, setIsUpdate] = useState({
    action: false,
    item_id: ''
  })

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Nome Completo",
      label: "Nome Completo:",
      required: true,
    },
    {
      id: 2,
      name: "birthdate",
      type: "date",
      label: "Data de nascimento:",
      required: true,
    },
    {
      id: 3,
      name: "cpf",
      type: "text",
      placeholder: "Digite o seu CPF",
      label: "CPF:",
      required: true,
    },
    {
      id: 4,
      name: "height",
      type: "number",
      placeholder: "Digite a sua altura",
      label: "Altura:",
      required: true,
    },
    {
      id: 5,
      name: "weight",
      type: "number",
      placeholder: "Digite o seu peso",
      label: "Peso:",
      required: true,
    },
  ];
  const options = ['M', 'F'];
  const options_label = 'Selecione o sexo:';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    if(isUpdate.action === false){
      try {
        
        const response = await fetch('https://mysterious-reef-24852-86886c7b05fa.herokuapp.com/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Response from API:', data);
      
      setFormData({
        name: '',
        birthdate: '',
        cpf: '',
        height: '',
        weight: '',
        sex: '',
      });
      
      window.location.reload()
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
  };

  const handleUpdate = async (id) => {
    console.log('entrou na função de update')
    try {
    const response = await fetch('https://mysterious-reef-24852-86886c7b05fa.herokuapp.com/person/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    await response.json();

    window.location.reload()
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <PersonInput
            key={input.id}
            name={input.name}
            type={input.type}
            value={formData[input.name]}
            placeholder={input.placeholder}
            label={input.label}
            onChange={handleChange}
            required={input.required}
            pattern={input.pattern}
            step='any'
          />
        ))}
        <label htmlFor='sex'>{options_label}</label>
        <div className="select-form">
          <select name="sex" value={formData.sex} onChange={handleChange}>
            {options.map((input) => (
              <PersonSelect
                key={input}
                name={input}
              />
            ))}
          </select>
        </div>
        {isUpdate.action ? <button onClick={() => {handleUpdate(isUpdate.item_id)}}>Atualizar</button> : <button type="submit">Submit</button>}
      </form>
      <PersonTable setIsUpdate={setIsUpdate} setFormData={setFormData} formData={formData}/>
    </div>
  );
}

export default App;
