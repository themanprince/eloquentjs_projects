

/*
  the range function takes two parameters and returns an array containing all the elements within this range(the limits inclusive)
*/
//its a recursive function
//it has been refined to generalisation as per the request of the assignment
let range = (min, max, step = 1) => {
  let finalArray = [];
  //the stop condition for positive step values
  if((step > 0) && min > max - step)
     return min; //next condition is for negative step values
  else if((step < 0) && min < max + step)
    return min;
  
  //adding the min to the rest of the array returned from this method to get the complete range
  finalArray.push(min);
  return (finalArray.concat(range(min + step, max, step)));
};


//THe sum function to add all the numbers in a range
let sum = array => {
  let theSum = 0;
  let index = 0;
  while(index < array.length) {
    theSum += array[index++];
  }
  
  return theSum;
};


//I'm exporting the range function out so I can run tests on it
module.exports.range = range;
module.exports.sum = sum;