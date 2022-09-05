
const Notification = ({ message }) => {

  const styles = {
    border: `4px solid ${message.type === 'error' ? 'red' : 'green'}`,
    borderRadius: '5px',
    background: 'lightgrey',
    padding: '1rem',
    color: message.type === 'error' ? 'red' : 'green',
    fontSize: '1.4rem'
  }

  if (message.message) return (
    <div id="notification" style={styles}>
      {message.message}
    </div>
  )
}

export default Notification