
const Total = ({parts}) => {

  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)

  return <p><b>total of {total} exercises</b></p>
}

export default Total;