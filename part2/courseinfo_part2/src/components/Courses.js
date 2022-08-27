import Course from "./Course";

const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(item => <Course key={item.id} course={item} />)}
    </div>
  )
}

export default Courses