let reverseArray = (array, finalArray = []) => {
  //the stop condiiton
  if(array.length === 1) {
    //pushing this remaining element to finalArray
    finalArray.push(array[0]);
    //at this point, I didn't know what I was doing anymore so I cant tell why this return statement is here
    return array;
  }
  
  
  //adding the last element to the finalArray
  let theLength = array["length"];
  finalArray.push(array[theLength - 1]);
  
  //removing the last element from array
  array.pop();
  //concatenating subsequent end elements to finalArray
  reverseArray(array, finalArray);
  
  return finalArray;
};


let reverseInPlace = array => {
  //first checking if array is even or odd
  let isEven = false;
  if((array.length % 2) == 0)
    isEven = true;
  
  //if its even, traverse up till middle element, exchanging them with the corresponding element as you go
  if(isEven) {
     for(let i = 0; i < (array.length/2); ++i) {
       //swapping
       //the toSwapWithINdex (tswi)
       let tswi = array.length - i - 1;
       //the element to swap with
       let tsw = array[tswi];
       //exchanging em with destructuring
       [array[i], array[tswi]] = [array[tswi], array[i]];
     }
   } else {
     //trasversing up till math.floor(array.length/2)
     for(let i = 0; i < (Math.floor(array.length/2)); ++i) {
       let tswi = array.length - i - 1;
       let tsw = array[tswi];
       //exchanging 'em via destructuring
       [array[i], array[tswi]] = [array[tswi], array[i]];
     }
   }
  
  //returning reversed array
  return array;
};

