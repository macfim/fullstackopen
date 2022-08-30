import React from 'react';

import Person from './Person';

const Persons = ({persons, deletePerson}) => {
  return (
    <div>
      {
        persons.map(item => <Person key={Math.random()} info={item} deletePerson={deletePerson}/>)
      }
    </div>
  );
};

export default Persons;