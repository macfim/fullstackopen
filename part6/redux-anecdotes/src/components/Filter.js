import { addFilter } from "../reducers/filterReducer";
import { useSelector, useDispatch } from "react-redux";

const Filter = () => {

  const dispatch = useDispatch();

  const handleChange = e => {

    dispatch(addFilter(e.target.value));    
  }

  return (
    <div>
      filter
      <input 
        name="filter"
        value={useSelector(state => state.Filter)}
        onChange={handleChange} 
      />
    </div>
  )
}

export default Filter;