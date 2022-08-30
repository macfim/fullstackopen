const Person = ({info, deletePerson}) => {
  return(
    <li>
      {info.name}:{info.number} <button onClick={() => deletePerson(info)}>delete</button>
    </li>
  )
};

export default Person;