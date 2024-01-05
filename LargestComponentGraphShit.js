//This is simply to get the largest component in a graph data structure... Mixed and produced by Mastercraft

//first off, getting my graph from a edge kini kur representation
let graphRepr = ["5-0",
				"1-0",
				"0-8",
				"4-2",
				"2-3",
				"3-4"];
//NExt off, a sizesArr... will be useful later in getting the largest component
let sizesArr = [];
//I'll be copying the makeGraph func from one program I did in the past... *feeling good rn*
//the function to make the graph from the graphRepr
let makeGraph = (graphRepr) => {
	//the graph object to be returned later
	let graph = Object.create(null);
	
	graphRepr.forEach(e => {
		//splitting to get both parts
		let bothParts = e.split("-");
		bothParts.forEach(currentPart => {

			//getting other part
			let otherPart;
			switch(bothParts.indexOf(currentPart)) {
				case 0: //then bothParts[1] is the other part
					otherPart = bothParts[1];
					break;
				case 1: //then bothParts[0] is the other part
					otherPart = bothParts[0];
					break;
				default:
					console.log(`houston, we have a problem in switch statement`);
			}
			
			//apparently, otherPart has been initialised at this point

			if(!Object.keys(graph).some(e => e === currentPart)) //the graph doesn't have it before
				graph[currentPart] = [otherPart];
			else //it exists in the graph
				graph[currentPart].push(otherPart);
		});
	});
	
	//returning the graph object
	return graph;
};
//making the graph with the function
let theGraph = makeGraph(graphRepr);

//next, a method to convert an array to linked list
//I'll use it to convert my graph property list to a linked list for easier operations with it
let arrayToList = (array, index = 0) => {
	if(index === array.length - 1)
		return {
			value: array[index],
			next: null
		};

	return {
		value: array[index],
		next: arrayToList(array, ++index)
	};
};

//the function for the traversal.. all it'll do is add nodes to the visited set and return a count variable
let traverse = (graph, startNode, visited) => {
	let count = 0;
	let queue = [ startNode ]; //push and shift only... like womb :D
	while(queue.length != 0)
	{
		//how'd you like my 'block pattern' :D
		let currEl = queue.shift();
		if(visited.has(currEl))
			continue;

		//adding it to visited set now
		visited.add(currEl);
		//adding its neigh to the queue
		for(let neighbour of graph[currEl])
			queue.push(neighbour);

		++count; //increasing the count counter :D
	}

	//returning count at the end of the whole operation
	return count;
};


//NExt is a loop function... its a recursive function(hence the name, 'loop' if you know what I mean *winks* :D)
//its main purpose is to help me loop thru all 'theGraph' nodes for the purpose of looping thru em... nonsense! you go tell me wetin you wan
//hear before
//Its main purpose is to loop thru an linked list of graph nodes, adding the sizes of their components(in the graph) to a sizesArr
let loop = (currNode, visited = new Set()) => {
	if(!visited.has(currNode.value))
	{
		let count = traverse(theGraph, currNode.value, visited);
		sizesArr.push(count);
	}

	//going again... the base case is considered here also
	if(currNode.next === null)
		return;
	else
		loop(currNode.next, visited);
}

//finally, the 'largest'-ish function ;D to get the largest value from an array
let largest = function(arr) {
	//don't ask me why I didn't use arrow function here
	return arr.reduce((currentRedVal/*the current val from reduction each state*/, currentArrVal) => {
		return (currentRedVal > currentArrVal)? currentRedVal: currentArrVal;
	});
	/*the algorithm behing this is simple...
	  the reduce function reduces the entire array to a value given by the largest number
	  since the reduce function uses an underlying loop to run my function, I just wrote the function thus:

	  use a ternary operator to compare the value at each point
	*/
};


//AND FINALLY... THE FUNCTION TO get the largest component from a graph
let largestComponent = () => {
	//starting from the first element
	let startNode = arrayToList(Object.keys(theGraph));
	loop(startNode);
	return largest(sizesArr);
};

//testing the function
console.log(largestComponent());