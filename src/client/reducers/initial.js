const initial = {
  app: {
    username: null,
    usernames: [],
  },
  users: {},
  messages: {
    list: [],
    entities: {},
  },
  privateMessages: {
    list: [],
    entities: {},
  },
  search: {
    // visible: false
    searchTerm: '',
    resultScores: [],
  },
};

export default initial
