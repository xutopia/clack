// function that will filter and arrange all messages in order of relevance

const sortDescending = (a, b) => {
  if(a.score - b.score > 1) {
    return -1;
  } else if(a.score - b.score < 1) {
    return 1;
  } else {
    return 0;
  }
}

const orderDescendingMessages = (messages, searchResults) => {
  const resultsDescendingSort = searchResults.sort(sortDescending);

  return resultsDescendingSort.map((result) => {
    const key = result.ref;
    return messages.entities[key];
  });
}

export default orderDescendingMessages;
