//the arrayToList function
let arrayToList = array => {
  //you can tell I'll make her recursive
  //the algorithm is - take the first element from this array, make an object out of it, whose 'rest' property is gotten from recursively calling this method until there is only
  //one element left in order to get nested objects
  
  //stop condition
  if(array.length == 1) {
    //making node from this one value and returning it
    let list = {
      value: array[0],
      rest: null
    };
    return list;
  }
  
  let list = {
    value: array[0],
    rest: arrayToList(/*The remaining elements of the array*/array.slice(1))
  };
  
  return list;
};

//the list to array function
let listToArray = (list) => {
  //the algorithm is - add the value of the current list item to the array, then recursively trasverse unto the other items of the list until we reach the last one
  //adding each subsequent item's value to the array we'll pass around
  let array = [];
  //the base case
  if(list.rest === null) {
    array = list.value;
    return array;
  }
  
  //adding the value
  array.push(list.value);
  
  return array.concat(listToArray(list.rest));
};

//the prepend function
let prepent = (list, val) => {
  //we convert the list to an array
  //add the value to the array, then
  //convert the array back to list
  //and return it
  let theArray = listToArray(list);
  theArray.unshift(val);
  return arrayToList(theArray);
};

//the nth function
let nth = (list, index) => {
  //the nth function returns the item at a specific index in a list
  
  //first converting to array
  let array = listToArray(list);
  let item;
  //first checking if index is within list's range of items
  if((index < 0) || (index >= array.length))
    item = "not exists";
  else
    item = array[index];
    
  
  return item;
};

//the recursive version of nth function
nthRecursive = (list, indexToReach, checkerIndex = 0) => {
  //we'll keep traversing to the rest of each concurrent list item until the checkerIndex equals the indexToReach
  
  //first base case is if its an invalid index supplied
  if(indexToReach < 0)
    return null;
  
  //next base case if it has gotten to end of list
  if(list.rest === null)
    return null;
  
  //next base case is if checkerIndex === indexToReach
  if(checkerIndex === indexToReach)
    return list.value;
  
  //trasversing to the other list items, assuming this is not the specified index
  return nthRecursive(list.rest, indexToReach, ++checkerIndex);
};
