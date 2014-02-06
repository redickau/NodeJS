var alphabet = new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
var specialChars = new Array(' ','.',',',':',';','*','!','@','#','$','%','^','&','(',')','?','/','<','>','[',']','{','}','+','=','~','`','\'','_','-','\"','\\');
var numbers = new Array('0','1','2','3','4','5','6','7','8','9');
var origMsg = "";
var capital = false;

exports.decipherMSG = function decipherMSG(msg, key) {    
    origMsg = "";

    for (var i = 0; i < msg.length; i++) {
	origMsg += decipher(msg[i], key);
    }
    return origMsg;
}

function decipher(chr, theKey) {
    capital = false;
    if (chr === chr.toUpperCase()) {
	capital = true;
	chr = chr.toLowerCase();
    }

    if (specialChars.indexOf(chr) !== -1)
	return chr;
    else if (numbers.indexOf(chr) !== -1) {	
	startIndex = numbers.indexOf(chr);
	
	if (theKey > 9)
	    theKey = theKey % 10;
	
	decipherIndex = startIndex - theKey;
	
	if (decipherIndex < 0)
	    decipherIndex = 10 - Math.abs(decipherIndex);
	
	if (capital === true)
	    return numbers[decipherIndex].toUpperCase();
	else
	    return numbers[decipherIndex];
    }
    else {
	decipherIndex = alphabet.indexOf(chr) - theKey;
	if (decipherIndex >= 0) {
	    if (capital === true)
		return alphabet[decipherIndex].toUpperCase();
	    else
		return alphabet[decipherIndex];
	}
	else {
	    if (capital === true)
		return alphabet[26 - Math.abs(decipherIndex)].toUpperCase();
	    else 
		return alphabet[26 - Math.abs(decipherIndex)];
	}
    }
}
