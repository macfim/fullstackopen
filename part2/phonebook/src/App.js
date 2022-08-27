import {useState} from 'react'

import Filter from './components/Filter';
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456', id: 1},
    {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    {name: 'Dan Abramov', number: '12-43-234345', id: 3},
    {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
  ])
  const [filteredData, setFilteredData] = useState(persons);

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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