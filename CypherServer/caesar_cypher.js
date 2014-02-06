var alphabet = new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
var specialChars = new Array(' ','.',',',':',';','*','!','@','#','$','%','^','&','(',')','?','/','<','>','[',']','{','}','+','=','~','`','\'','_','-','\"','\\');
var numbers = new Array('0','1','2','3','4','5','6','7','8','9');
var inputString = "";
var key = -1;
var orig_key = -1;

exports.buildCypherString = function buildCypherString (str) {
    var cypherString = "";

    var startIndex = -1;
    var cypherIndex = -1;
    key = (Math.floor(Math.random() * 25)) + 1;
    orig_key = key;

    for (var i = 0; i < str.length; i++) {
	key = orig_key;

	var capital = false;
	if (str[i] === str[i].toUpperCase())
	    capital = true;

	if (specialChars.indexOf(str[i]) !== -1)
	    cypherString += str[i];
	else if (numbers.indexOf(str[i]) !== -1) {
	    startIndex = numbers.indexOf(str[i]);

	    if (key > 9)
		key = key % 10;

	    cypherIndex = startIndex + key;

	    if (cypherIndex > 9)
		cypherIndex = cypherIndex % 10;
	    
	    cypherString += numbers[cypherIndex];
	}
	else {
	    startIndex = alphabet.indexOf(str[i].toLowerCase());
	    cypherIndex = startIndex + key;

	    if (cypherIndex <= 25) {
		if (capital === true)
		    cypherString += alphabet[cypherIndex].toUpperCase();
		else
		    cypherString += alphabet[cypherIndex];
	    }
	    else {
		if (capital === true)
		    cypherString += alphabet[cypherIndex - 26].toUpperCase();
		else
		    cypherString += alphabet[cypherIndex - 26];
	    }
	}	
    }
    return cypherString;
}

exports.getKey = function getKey() {
    return orig_key; 
}
