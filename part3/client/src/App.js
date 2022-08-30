import {useState, useEffect} from 'react';

import Filter from './components/Filter';
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personsService from './services/persons';

const Message = ({type, text}) => {

  const errorStyles = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const successStyles = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (type === 'success') return (
    <div style={successStyles}>
      {text}
    </div>
  )

  if (type === 'error') return (
    <div style={errorStyles}>
      {text}
    </div>
  )

  return <div></div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredData, setFilteredData] = useState(persons);

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {

    personsService
      .getAll()
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  const addPerson = newPerson => {

    personsService
      .createPerson(newPerson)
      .then(response => {
        setPersons([...persons, response.data]);
        setSuccessMessage(`Added ${response.data.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = ({name, id}) => {

    if (!window.confirm(`Delete ${name}?`)) return;

    personsService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(item => item.id !== id));
      })
      .catch(error => {
        setErrorMessage(`Information of ${persons.find(item => item.id === id).name} has already been removed from server`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updatePersonNumber = (name, newNumber) => {
    const {id} = persons.find(item => item.name === name);
    const person = persons.find(item => item.id === id);
    const changedPerson = {...person, number: newNumber};

    console.log('id',id)

    personsService
      .updatePerson(id, changedPerson)
      .then(response => {
        setPersons(persons.map(item => item.id !== id ? item : response.data));
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (persons.some(item => item.name === newName)) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return;

      updatePersonNumber(newName, newNumber);

    } else
      addPerson({
        name: newName,
        number: newNumber,
      })

    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = ({target}) => {
    setNewName(target.value);
  }

  const handleNumberChange = ({target}) => {
    setNewNumber(target.value);
  }

  const handleFilterChange = ({target}) => {
    setQuery(target.value);
    setFilteredData(persons.filter(item => item.name.toLowerCase().includes(query.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      { successMessage
        ? <Message text={successMessage} type='success' />
        : <div></div>
      }
      { errorMessage
        ? <Message text={errorMessage} type='error' />
        : <div></div>
      }
      <div>
        filter shown with <input onChange={handleFilterChange} value={query}/>
      </div>
      <Filter filteredData={filteredData} />
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App;