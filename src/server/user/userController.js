// The controller for the user actions
import { createUser } from './userModel';

const makeNewUser = (req, res) => {
  createUser(req.body, (result) => {
    if (result === undefined) {
      res.sendStatus(409);
    } else {
      res.status(201).json(result);
    }
  });
};

export default makeNewUser;
