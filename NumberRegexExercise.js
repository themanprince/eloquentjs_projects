//first defining the regex for js numbers
let regex = /[+\-]?((\d+\.\d+)|(\d+\.)|(\.\d+)|(\d+))(e(-)?\d+)?/gi;

//testing the regex
let testString = "-5e10 or 3.5E3 or -.5 or 10e-3. This should return only the numbers in this string";
let exec;
while(exec = regex.exec(testString)) { /*taking advantage of js' truthiness shit*/
	console.log(exec);
}