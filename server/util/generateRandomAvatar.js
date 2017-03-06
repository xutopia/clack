// container of unicode emoji code that will be sent to user when they login
import avatars from './avatars';

const generateRandomAvatar = () => {
  const index = Math.floor((Math.random() * avatars.length) - 1) + 1;
  return avatars[index];
}

export default generateRandomAvatar;
