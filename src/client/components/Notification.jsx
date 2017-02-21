// presentational web API notification using react-web-notification
// ```channel/Room
// name
// message```

import React from 'react';
// import Notif from 'react-web-notification/lib/components/Notification';

export default Notification = ({ body, title }) => {
  const options = {
    lang: 'en',
    body: body,
  }
  return (
    <div>
      Something about a notification
      <Notif
        title={title}
        timeout={5000}
        options={options}
        />
    </div>
  )
}
