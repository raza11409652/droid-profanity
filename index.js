const _ = require("lodash");

const hindiWords = require("./data/hindi.words");
const englishWords = require("./data/english.word");

/**
 * It will validate String to check is their any hindi or english bad word is present or not
 *
 * @param {required} str
 * @returns true if its pure else return  false
 */
const validateStringForPurity = (str) => {
  if (!str || typeof str !== "string") {
    throw new Error("message passed to the function must be a string");
  }
  let messageWords = str.split(" ");
  const lengthArray = messageWords.length;
  let dictionary = _.merge(hindiWords, englishWords);
  let dictionaryArray = [];
  dictionary = _.transform(dictionary, function (result, val, key) {
    result[key.toLowerCase()] = val;
    dictionaryArray.push(key.toLowerCase());
  });
  let flag = true;
  for (let i = 0; i < lengthArray; i++) {
    var word = messageWords[i];
    if (dictionary.hasOwnProperty(word.trim().toLowerCase())) {
      flag = false;
      break;
    }
  }
  for (let i = 0; i < dictionaryArray.length; i++) {
    let element = dictionaryArray[i];
    str = str.toLowerCase();
    if (str.indexOf(element) !== -1) {
      flag = false;
      break;
    }
  }
  return flag;
};

module.exports = { validateStringForPurity };
