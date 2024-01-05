//first, making the iterator for thePGroup
class Iterator {
	  
	  constructor(upperClass/*the calling class*/) {
	  	   this.index = 0;
	  	   this.upperClass = upperClass;
	  }
	  
	  next() {
	  	     //first checking if we done
	  	     if(this.index >= this.upperClass.set.length)
	  	         return { value: undefined,
	  	                        done: true};
	  	      //building up final value to be returned                 
	  	     let theValue = ``;
	  	     if(this.index === 0)
	  	         theValue += `( \n`;
	  	    
	  	    theValue += this.upperClass.set[this.index++].value;
	  	    //if we at the last element
	  	    if(this.index === this.upperClass.set.length )
	  	        theValue += `\n)`;
	  	   
	  	     //finally returning it
	  	     return {
	  	    	    value: theValue,
	  	    	    done: false
	  	     };
	  }
}


//Now, thePGroup class
class PGroup {
	   constructor(set) {
	   	   this.set = set;
	   	   //using arrow function so I can refer to PGroup
	   	   //as this from inside it
	   	   this[Symbol.iterator] = () => {
	   	   	   return new Iterator(this);
	   	   };
	   	   Object.freeze(this);
	   }
	   
	   //the has method
	   has(item) {
	   	   for(let i = 0; i < this.set.length; ++i) {
	   	   	   let currItem = this.set[i];
	   	   	   if(currItem === item)
	   	   	       return true;
	   	   }
	   	   return false;
	   }
	   
	   
	   //the add method
	   add(value) {
	   	   let newSet = [...this.set];
	   	   if(!(this.has(value)))
	   	       newSet.push({ value });
	   	   //making the new PGroup to be returned
	   	   let newPGroup = new PGroup(newSet);
	   	   return newPGroup;
	   }
	   
	   //the delete method
	   delete(item) {
	   	   let newSet = [...this.set];
	   	   if(has(item))
	   	       newSet = this.set.filter(({value}) => { return (value != item)});
	   	   
	   	   let newPGroup = new PGroup(newSet);
	   	
	   	   return newPGroup;
	   }
}
//PGroup.empty
PGroup.empty = new PGroup([]);