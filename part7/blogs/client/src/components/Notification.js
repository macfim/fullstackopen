import { useSelector } from "react-redux";

const Notification = () => {

  const {content, type} = useSelector(state => state.notification);

  const styles = {
    border: `4px solid ${type === 'error' ? 'red' : 'green'}`,
    borderRadius: '5px',
    background: 'lightgrey',
    padding: '1rem',
    color: type === 'error' ? 'red' : 'green',
    fontSize: '1.4rem'
  }

  if (content) return (
    <div id="notification" style={styles}>
      {content}
    </div>
  )
}

export default Notification