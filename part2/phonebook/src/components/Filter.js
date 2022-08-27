import React from 'react';

import Person from './Person';

const Filter = ({filteredData}) => {
  return (
    <div>
      {
        filteredData.map(item => <Person key={Math.random()} info={item}/>)
      }
    </div>
  );
};

export default Filter;