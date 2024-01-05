//testing regex
let datePattern = /\d{2}-\d{2}-\d{4} \d{2}:\d{2}/;
//that bitch should match a date
let matchesOne = datePattern.test("23-12-2004 09:12");
//should return true
let matchesTwo = datePattern.test("heyy");
//should return false
console.log(`matchesOne is ${matchesOne}, matchesTwo is ${matchesTwo}`);

//next, checking to see what the exec method does when we have more than one
//match
let testPattern = /(\d{1,2})+ (\d{1,2})/; //This regex matches two numbers(one to two digits) that are following each other in a string
let theObj = testPattern.exec("2 3 23 haha 23");
console.log(`the index property value is ${theObj.index},\n and was anything found? ${testPattern.test("2 3 23 haha 23")}`);
console.log(theObj); //this should echo obj that matches the whole pattern.. then also, as a property of the object, parts of the string that
//matches the patterns in parentheses

//next I wanna see the two uses of the caret symbol ^ in a regex
//first use is pattern invertion
let colorWithDifferentU = /colo[^u]r/;
console.log(colorWithDifferentU.test("coloar")); //should return true
console.log(colorWithDifferentU.test("colour")); //should return false
//next use is as start delimeterizer... that word was totally made up by me
let startsWithPussy = /^(pussy)/;
console.log(startsWithPussy.test("pussyniggas")); //should return true

//next is their getDate function that creates a date object from a string using regex
function getDate(string) {
	let [_, day, month, year] = /(\d{1,2})-(\d{1,2})-(\d{2,4})/.exec(string);
	return new Date(year, month - 1, day);
}
console.log(`The date is ${getDate("25-11-2005")}`);


//Next, I wanna confirm if the arguments supplied to the callback given to the replace function... are the same as the ones gotten if the exec
//method of the regular expression was called
//first making the regex
let regex = /(Name): (\w+) \n?(Age): (\d+)/i;
//writing a function that accepts these elements from the regex after matching
let theFunction = (wholematch, nameString, name, ageString, age) => {
	//main purpose of writing this func is to log em values to the console
	console.log(nameString, "\n");
	console.log(name, "\n");
	console.log(ageString, "\n");
	console.log(age, "\n");
	return "matched";
};
//next calling replace method on a string that matches this regex to see the arguments it'll suply to the replace method
let replaced = "Name: Prince Age: 23".replace(regex, theFunction);
console.log(replaced);