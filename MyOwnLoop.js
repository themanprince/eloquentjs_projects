let myOwnLoop = (dataset, test, update, body) => {
  //going thru all the dataset items
  for(let item of dataset) {
    if(!test(item)) {
      body(item);
      update(item);
    }
  }
};
