import { connect } from 'react-redux';

const Notification = props => {

  const notificationMessage = props.notification;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notificationMessage) return (

    <div style={style}>
      {notificationMessage}
    </div>
  )
}

const connectedNotifcation = connect()(Notification);
export default connectedNotifcation