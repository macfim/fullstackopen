import React from 'react';

import Person from './Person';

const Persons = ({persons}) => {
  return (
    <div>
      {
        persons.map(item => <Person key={Math.random()} info={item}/>)
      }
    </div>
  );
};

export default Persons;