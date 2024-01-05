//the factory method for the circle
const createCircle = (radius) => {
	return {
		radius,
		draw: () => {
			console.log(`Draw`);
		}
	};
};

//creating new circle
const circle = createCircle(1);
circle.draw();

//using constructor
const Circle = function(radius) {
	this.radius = radius;
	this.draw = () => {
		console.log(`Draw`);
	}
};
const another = new Circle(1);
another.draw();
