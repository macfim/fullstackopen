import React, {useState, useEffect} from 'react';
import axios from 'axios'

import Countries from "./components/Countries";

const App = () => {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data)
        setIsLoading(false)
      })
  }, [])

  const handleChange = ({target}) => {
    setQuery(target.value)

    setFilteredData(data.filter(item => item.name.common.toLowerCase().includes(query.toLowerCase())))
  }

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      <label htmlFor="search">find countries</label>
      <input id="search" onChange={handleChange} value={query} />
      <Countries data={filteredData} />
    </div>
  );
};

export default App;