//first, the roadGraph
//but before that, the edge-list
const roads = [
"Alice's House-Bob's House", "Alice's House-Cabin",
"Alice's House-Post Office", "Bob's House-Town Hall",
"Daria's House-Ernie's House", "Daria's House-Town Hall",
"Ernie's House-Grete's House", "Grete's House-Farm",
"Grete's House-Shop", "Marketplace-Farm",
"Marketplace-Post Office", "Marketplace-Shop",
"Marketplace-Town Hall", "Shop-Town Hall"
];

//now the graph
function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}
//sorry... now the graph
const roadGraph = buildGraph(roads);

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}
//the random robot
function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}
//the findRoute function helps get route finding robot
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}
//the goalOrientedRobot
function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}


//the village state class
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    
    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
        return new VillageState(destination, parcels);
        }
    }
   
}
//static method
VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
}
    return new VillageState("Post Office", parcels);
};



//runRobot function
function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            return turn;
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

//now, one thing that wasn't copied
//the number two assignment is to make a faster robot which is an optimisation of goalOrientedRobot
let fasterRobot = ({place, parcels}, route) => {
    if (route.length == 0) {

    	for(let parcel of parcels) {
    		let newRoute = [];
	        if (parcel.place != place) {
	            newRoute = findRoute(roadGraph, place, parcel.place);
	        } else {
	            newRoute = findRoute(roadGraph, place, parcel.address);
	        }
	        //the condition for switching routes
	        if( route.length === 0 || route.length > newRoute.length )
	        	route = newRoute;
    	}
    }
    
    return {direction: route[0], memory: route.slice(1)};

};

//finally, after all that copying
let compareRobot = (robot1, robot2) => {
	//robot1 has to be random robot
	//while robot2 will be routeFindingRobot
	let rob1Total = 0, rob2Total = 0;
	//looping for 100 times
	for(let i = 1; i < 101; ++i) {
	    let state = VillageState.random();
	    let rob1Steps = runRobot(state, robot1, []);
	    let rob2Steps = runRobot(state, robot2, []);
	    rob1Total += rob1Steps;
	    rob2Total += rob2Steps;
	}
	
	//after looping, getting average of steps
	let rob1Avg = rob1Total/100, rob2Avg = rob2Total/100;
	
	return [ rob1Avg, rob2Avg ];
};


//testing
let [fasterRob, goalRob] = compareRobot(fasterRobot, goalOrientedRobot);
console.log(`faster Robot had average of ${fasterRob} steps while goalOrientedRob had average of ${goalRob} steps`);