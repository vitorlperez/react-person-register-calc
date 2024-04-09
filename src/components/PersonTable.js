import { useState, useEffect } from 'react';
import './PersonTable.css'

function PersonTable(props) {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    search: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mysterious-reef-24852-86886c7b05fa.herokuapp.com/person/list');
        const jsonData = await response.json();
        const formattedData = jsonData.data.map(item => ({
            ...item,
            birthdate: new Date(item.birthdate),
          }));
          setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
    };
  }, []);

  const formatBrazilianDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  const formatToIsoDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (item) => {
    const newDate = new Date(item.birthdate)
    const formatedDate = formatToIsoDate(newDate)
    props.setIsUpdate({
        action: true,
        item_id: item.id
    })
    props.setFormData({
        ...item,
        birthdate: formatedDate
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('https://mysterious-reef-24852-86886c7b05fa.herokuapp.com/person/list?username=' + formData.search);
        const jsonData = await response.json();
        const formattedData = jsonData.data.map(item => ({
        ...item,
        birthdate: new Date(item.birthdate),
        }));
        setData(formattedData);
        setFormData({ search: ''})
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const deletPerson = async (id) => {
        try {
            console.log(id)
            await fetch('https://mysterious-reef-24852-86886c7b05fa.herokuapp.com/person/' +  id, {
                method: 'DELETE',
            });
            window.location.reload()
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    const calcWeight = (sex, height) => {
        console.log(sex)
        console.log(height)
        if(sex === 'M'){
            alert(((77.7 * height)-58).toString().slice(0,2))
        }else {
            alert(((62.1 * height)-44.7).toString().slice(0,2))
        }
    }

  return (
    <div>
        <h2>Pessoas Registradas</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor='search'>Busque:</label>
            <input type='text' id='search' name='search' placeholder='Digite o nome da Pessoa' onChange={handleChange}></input>
            <button type='submit'>Pesquisar</button>
        </form>
        <table>
        <thead>
            <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Sexo</th>
            <th>CPF</th>
            <th>Altura</th>
            <th>Peso</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {Array.isArray(data) && data.map((item, index) => (
            <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{formatBrazilianDate(item.birthdate)}</td>
                <td>{item.sex}</td>
                <td>{item.cpf}</td>
                <td>{item.height}</td>
                <td>{item.weight}</td>
                <td>
                    <button onClick={() => { calcWeight(item.sex, item.height )}}>Peso Ideal</button>
                    <button onClick={() => { handleUpdate(item) }}>Atualizar</button>
                    <button onClick={() => { deletPerson(item.id) }}>Remover</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
}

export default PersonTable;
