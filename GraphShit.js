let graphRepr = ["a-b", "a-c", "a-f", "b-e", "c-f", "c-e", "d-e", "e-g", "e-h"];

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


//making the graph
let theGraph = makeGraph(graphRepr);

//trying the dfs again recursively
//getting the random element
let randIndex = Math.floor(Math.random() * Object.keys(theGraph).length);
let randProp = Object.keys(theGraph)[randIndex];
theGraph.dfs = function(action/*the action you want done on each node*/, visited = new Set(), stack = [randProp]){
	if(stack.length === 0)
		return; //base case
		
	//getting last element
	let lastEl = stack.pop();
	
	//if we've worked on it before, move on
	if(visited.has(lastEl))
		;
	else {
		action(lastEl);
		//adding this element to the visited list
		visited.add(lastEl);
		//adding its neighbours to the stack
		this[lastEl].forEach(e => stack.push(e));
	}
	//going again
	this.dfs(action, visited, stack);
};

//testing
theGraph.dfs(e => {console.log(e)});
