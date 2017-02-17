// controllers for messages
import { createMessage, fetchMessages } from './messagesModel';

export const makeNewMessage = (req, res) => {
  createMessage(req.body, (result) => {
    res.status(201).json(result);
  });
};

export const getAllMessages = (req, res) => {
  fetchMessages(req.params, (messages) => {
    res.status(200).json(messages);
  });
};
