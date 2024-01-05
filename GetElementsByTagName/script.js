//the function to get elements by tag name
let getEm = (nodeToStart, tagName) => {
	//the queue.. I'm not doing recursive... a traversal algorithm
	let queue = [nodeToStart], found = []; //found is found
	while(queue.length > 0) {
		let el = queue.pop();
		if(el.nodeName === tagName.toUpperCase())
		{
			found.push(el);
		}
		if(el.nodeType = Node.ELEMENT_NODE)
			Array.from(el.childNodes).forEach(child => {
				queue.push(child);
			});
	}
	return found;
};

//logging to the console
console.log(getEm(document, "div"));