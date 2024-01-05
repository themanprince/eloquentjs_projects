//everything has two implementations, one using an internal loop and another using some() function

let everythingLooped = (dataset, test/*test is the test function*/) => {
  let allConcur = true; //after this loop, we go know if all of them really concur
  for(let item of dataset) {
    if(!test(item))
      allConcur = false;
  }
  
  return allConcur;
};

//testing the bitch
let testDara = ["Prince", "Peace", "Precious", "Monkeys"];
if(everythingLooped(testDara, (e => e.charCodeAt(0) == "80")))
  console.log("Yea, you in the P gang");
else
  console.log("Who that homie? That pimp ain't P gang");
  
  
