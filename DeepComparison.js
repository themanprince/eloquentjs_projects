//the deepEquals function
let deepEquals = (item1, item2) => {
    //first base case - if either one is null
    if(item1 === null || item2 === null)
        return false;
    
    //second base case - if none is object
    //obj is my reference to 'object'... itself
    let obj = typeof [];
    if((typeof item1 != obj) && (typeof item2 != obj))
        if(/*if both are equal, return true*/item1 === item2)
            return true;
        else
            return false;
     
     //third base case - if one is an object and the other is not
     if(((typeof item1 == obj) && (typeof item2 != obj)) || ((typeof item1 != obj) && (typeof item2 == obj)))
        return false;
     
     //if I passed all these... recursive case is if both are objects
     if(typeof item1 == obj && typeof item2 == obj) {
        //first check - if they both have same no of properties
        if(Object.keys(item1).length === Object.keys(item2).length) {
            //they've passed the test of same length
            //next, traversing thru all they keys if they the same
            
            //an indicating flag
            let areSame = true;
            
            for(let i = 0; i < Object.keys(item1).length; i++) {
                if(Object.keys(item1)[i] != Object.keys(item2)[i])
                    areSame = false;
            }
            
            //if areSame is still truem then they have same keys and same no of keys
            //if not...
            if(areSame)
                return false;
                
            //next, going thru each property to see if they are the same
            let areStillSame = true;
            for(let prop of Object.keys(item1)) {
                areStillSame = deepEquals(item1[prop], item2[prop]);
                if(!areStillSame)
                    break;
            }
            return areStillSame;
        } else {
            //they are not equal
            return false;
        }
     }
     
     //finally, if none of the above conditions evaluate, return false to the fucker's ass
     return false;
};
