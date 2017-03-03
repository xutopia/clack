// render a message to be displayed for the current user
import dateformat from 'dateformat';

const renderGreetMsg = (time) => {
  const hour = time.slice(0, 2);
  if (+hour >= 0 && +hour < 12) {
    return 'Good morning';
  } else if (+hour >= 12 && +hour < 5) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}
const renderGreeting = (name) => {
  const now = new Date();
  const time = dateformat(now, 'isoTime');
  const greet = renderGreetMsg(time);
  return `${greet}, ${name}!`;
}


export default renderGreeting;
