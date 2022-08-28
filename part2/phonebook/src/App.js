import {useState, useEffect} from 'react';
import axios from "axios";

import Filter from './components/Filter';
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredData, setFilteredData] = useState(persons);

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {

    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })

  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    if (persons.some(item => item.name === newName)) {
      alert(`${newName} is already added to phonebook`);

    } else
      setPersons([...persons, {name: newName, number: newNumber}]);

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
    setNewFilter(target.value);
    search()
  }

  const search = () => {
    const filteredData = persons.filter(item => {
      if (newFilter === '') return item
      else if (item.name.toLowerCase().includes(newFilter.toLowerCase())) {
        return item
      }
    })
    setFilteredData(filteredData);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilterChange}/>
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
      <Persons persons={persons} />
    </div>
  )
}

export default App;