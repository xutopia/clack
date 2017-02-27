## Server

- [ ] `sendToAll`

```
    const sendToAll = (socket, sessionId, action, data) => {
      console.log(`${d()}${g(' ==> ')} ${s(action)} ${gr(JSON.stringify(data))}`);
      socket
        .broadcast
        .to(getRoom(sessionId))
        .emit(action, data);
    };
```

- [ ] `sendToSelf`

```
  const sendToSelf = (socket, action, data) => {
    console.log(`${d()}${g(' --> ')} ${s(action)} ${gr(JSON.stringify(data))}`);
    socket.emit(action, data);
    };
```

- [ ] `sendToSelf`

```
  const sendToSelf = (socket, action, data) => {
    console.log(`${d()}${g(' --> ')} ${s(action)} ${gr(JSON.stringify(data))}`);
    socket.emit(action, data);
    };
```
