//I haven't started the modules stuff first... I wanna test one regex shit I
//saw
let testString = "Hi, my name is Prince";
let replacedString = testString.replace(/hi|prince|name/gi, tag => {
	if(tag === "Hi")
		return "Hello";
	if(tag === "name")
		return "dick";
	if(tag === "Prince")
		return "long";
});
console.log(replacedString);
