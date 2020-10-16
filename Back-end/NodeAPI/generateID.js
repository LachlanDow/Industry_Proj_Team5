
//kept this function if we want to use math random algorithm
function randomInt(low, high) {
  var num = ( Math.floor(Math.random() * (high - low) + low))
  return num.toString()
  
}

//kept this function if we want to use uuid
function createUuid()
{
const { v4: uuidv4 } = require('uuid');
var id= uuidv4(); 
return id.slice(0,6);
    }

function leftPad(str, length) {
  str = str == null ? '' : String(str)
  length = ~~length
  pad = ''
  padLength = length - str.length
  while (padLength--) {
    pad += '0'
  }
  return pad + str
}

//currently the algorithm used
 function cryptPin(){
  const crypto = require('crypto');
var buf= crypto.randomBytes(3);
  return buf.toString('hex');
};

exports.cryptPin = cryptPin
/*module.exports = function () {
    const crypto = require('crypto');
    var buf = crypto.randomBytes(3);
    return buf.toString('hex');
};*/
