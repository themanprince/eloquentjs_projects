/*This function takes a bidimensional array and flattens it to a unidimensional array*/
let flatten = (array) => {
 
  //apparently, array is a multidimensional array
  //reducing it to a single array
  let resultArray = array.reduce((finalArr, subArr) => {
    
    finalArr = finalArr.concat(subArr);
    console.log("Just concatenated subArr with finalArr");
    return finalArr;
  }, []);
  
  return resultArray;
};

//testing
let testArray = [
  ["Bitch", "better"],
  ["work", "at"],
  ["all", "costs."],
  ["Yea", "Sir"],
];

console.log(flatten(testArray));
