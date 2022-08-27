import React from 'react';

const PersonForm = (props) => {
  return (
    <div>
      <h2>Add new one</h2>
      <form onSubmit={props.handleSubmit}>
        <div>
          name: <input onChange={props.handleNameChange} value={props.newName}/>
        </div>
        <div>
          number: <input onChange={props.handleNumberChange} value={props.newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;