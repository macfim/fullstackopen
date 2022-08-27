import {useState} from 'react'

const StatisticLine = ({text, value}) => <tr>
  <td>{text}: {value}{text === 'positive' && '%'}</td>
</tr>

const Statistics = ({stats}) => {

  const {good, neutral, bad} = stats;

  if (!(good || neutral || bad)) return <p>No feedback giver</p>;

  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={good + neutral + bad}/>
      <StatisticLine text="average" value={(good+neutral+bad)/3}/>
      <StatisticLine text="positive" value={(good / (good+neutral+bad)) * 100}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <button
        onClick={() => setGood(good + 1)}>good</button>
      <button
        onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button
        onClick={() => setBad(bad + 1)}>bad</button>
      <h2>statistics</h2>
      <Statistics stats={{good, neutral, bad}}/>
    </div>
  )
}

export default App