//This is just to get the island with the minimum number of nodes


//first off, the graph data structure I'll be using
let theGraph = [
					['W', 'W', 'W', 'W', 'W', 'W'],
					['W', 'L', 'L', 'W', 'W', 'W'],
					['W', 'W', 'L', 'W', 'W', 'W'],
					['W', 'W', 'W', 'W', 'W', 'W'],
					['W', 'L', 'L', 'W', 'L', 'L'],
					['W', 'W', 'L', 'W', 'L', 'L'],
					['W', 'W', 'W', 'W', 'W', 'W']
				];

//First function I'll make is the traversal function
let traverseLand = (graph, nodeX, nodeY, visited) => {
	let count = 1;
	visited.add(`${nodeX}, ${nodeY}`);
	//getting its inbound neighbors co-ordinates
	let neighCoord = [];
	neighCoord.push([nodeX + 1, nodeY]);
	neighCoord.push([nodeX - 1, nodeY]);
	neighCoord.push([nodeX, nodeY + 1]);
	neighCoord.push([nodeX, nodeY - 1]);
	//filtering out some out-of-bounds modafuckers
	neighCoord = neighCoord.filter(([x, y]) => (x < graph.length && x >= 0 && y >= 0 && y < graph[0].length));

	//apparently, all that will be left is the filtered modafuckers who passed the test
	for(let [x, y] of neighCoord) {
		let currEl = graph[x][y];
		if(currEl === "L" && !(visited.has(`${x}, ${y}`)))
			count += traverseLand(graph, x, y, visited);		
	}

	return count;

};

//then the minIsland function
let minIsland = (graph) => {
	//the visited set and minIslandCount vars
	let visited = new Set(), minIslandCount = 0;
	for(let i = 0; i < graph.length; i++)
		for(let j = 0; j < graph[i].length; ++j) {
			if(visited.has(`${i}, ${j}`))
				continue;

			if(graph[i][j].toLowerCase() === 'l') {
				let count = traverseLand(graph, i, j, visited); //count nodes of land accessible from this land
				if(minIslandCount === 0) //we are coming across first island
					minIslandCount = count;
				else if(count < minIslandCount)
					minIslandCount = count;
			}

			//adding current item to visited set... it won't be re-added to visited if it was added in the landtraversal function
			//cus visited is a set
			visited.add(`${i}, ${j}`);
		}

	return minIslandCount;
};


//testing minIsland function with theGraph... should return 3 as answer
let minLandCount = minIsland(theGraph); //3
console.log(minLandCount);