// The controller for the user actions
import { createUser, fetchUsers } from './userModel';

export const makeNewUser = (req, res) => {
  createUser(req.body, (result) => {
    if (result === undefined) {
      res.sendStatus(409);
    } else {
      res.status(201).json(result);
    }
  });
};

export const fetchAllUsers = (req, res) => {
  fetchUsers(req.body, (result) => {
    if (result === undefined) {
      res.sendStatus(400);
    } else {
      res.status(200).json(result);
    }
  });
};
