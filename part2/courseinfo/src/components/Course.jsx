// Header component to render the course name
const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

// Part component to render a single part and its exercise count
const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

// Content component to render the parts using Part components
const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

// Total component to render the total number of exercises
const Total = (props) => {
  const sum = props.course.parts.reduce((total, part) => {
    return total + part.exercises
  }, 0)
  
  return (
    <p><b>Total of {sum} exercises</b></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course 