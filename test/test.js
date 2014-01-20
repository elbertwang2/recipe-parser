/*global require, describe, it */
var assert = require('assert'),
    pluralize = require('pluralize'),
    natural = require('natural'),
    _ = require('underscore'),
    chai = require('chai');

var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var ingredients = [
  {
    '2 pounds russet potatoes, unpeeled and scrubbed': {
      description: 'russet potatoes',
      direction: 'unpeeled and scrubbed',
      measurement: 'pounds',
      quantity: '2'
    }
  }, {
    '8 tablespoons unsalted butter (1 stick), melted': {
      description: 'unsalted butter',
      direction: 'melted',
      measurement: 'tablespoons',
      quantity: '8',
      alt: '1 stick'
    }
  }, {
    '1 1/2 teaspoons table salt': {
      description: 'table salt',
      measurement: 'teaspoons',
      quantity: '1 1/2'
    }
  }, {
    '1/2 teaspoon ground black pepper': {
      description: 'black pepper',
      direction: 'freshly ground',
      measurement: 'teaspoon',
      quantity: '1/2'
    }
  }, {
    '2 tablespoons prepared horseradish': {
      description: 'prepared horseradish',
      measurement: 'tablespoons',
      quantity: '2'
    }
  }, {
    '1/4 cup grated fresh horseradish': {
      description: 'horseradish',
      direction: 'grated fresh',
      measurement: 'cup',
      quantity: '1/4'
    }
  }, {
    '3 medium scallions, green parts only, minced': {
      description: 'scallions',
      direction: 'green parts only, minced',
      measurement: 'medium',
      quantity: '3'
    }
  }, {
    '1 1/4 teaspoons table salt': {
      description: 'table salt',
      measurement: 'teaspoons',
      quantity: '1 1/4'
    }
  }, {
    '1/2 teaspoon ground black pepper': {
      description: 'black pepper',
      direction: 'freshly ground',
      measurement: 'teaspoon',
      quantity: '1/2'
    }
  }, {
    '2 tablespoons grainy mustard': {
      description: 'grainy mustard',
      measurement: 'tablespoons',
      quantity: '2'
    }
  }, {
    '3 ounces smoked cheddar cheese, grated (1 cup)': {
      description: 'smoked cheddar cheese',
      direction: 'grated',
      measurement: 'ounces',
      quantity: '3',
      alt: '1 cup'
    }
  }, {
    '1 teaspoon smoked paprika (sweet or bittersweet)': {
      description: 'smoked paprika',
      direction: 'sweet or bittersweet',
      measurement: 'teaspoon',
      quantity: '1'
    }
  }, {
    '8 tablespoons unsalted butter (1 stick)': {
      description: 'unsalted butter',
      measurement: 'tablespoons',
      quantity: '8',
      alt: '1 stick'
    }
  }, {
    '3 medium cloves garlic, minced or pressed through garlic press (1 generous tablespoon)': {
      description: 'garlic cloves',
      direction: 'minced or pressed through garlic press',
      measurement: 'medium',
      quantity: '3',
      alt: '1 generous tablespoon'
    }
  }, {
    '1/2 teaspoon ground black pepper': {
      description: 'black pepper',
      direction: 'freshly ground',
      measurement: 'teaspoon',
      quantity: '1/2'
    }
  }, {
    '1 1/2 teaspoons unsalted butter': {
      description: 'unsalted butter',
      measurement: 'teaspoons',
      quantity: '1 1/2'
    }
  }, {
    '1 1/2 teaspoons vegetable oil': {
      description: 'vegetable oil',
      measurement: 'teaspoons',
      quantity: '1 1/2'
    }
  }, {
    '1/2 teaspoon light brown sugar': {
      description: 'light brown sugar',
      measurement: 'teaspoon',
      quantity: '1/2'
    }
  }, {
    '1 pound yellow onions (4 small or 3 medium), sliced 1/4 inch thick': {
      description: 'yellow onions',
      direction: 'sliced 1/4 inch thick',
      measurement: 'pound',
      quantity: '1',
      alt: '4 small or 3 medium'
    }
  }, {
    '1 cup port, preferably ruby port': {
      description: 'port',
      direction: 'preferably ruby port',
      measurement: 'cup',
      quantity: '1'
    }
  }, {
    '1 teaspoon chopped fresh thyme leaves': {
      description: 'thyme leaves',
      direction: 'chopped fresh',
      measurement: 'teaspoon',
      quantity: '1'
    }
  }, {
    '6 tablespoons unsalted butter, melted': {
      description: 'unsalted butter',
      direction: 'melted',
      measurement: 'tablespoons',
      quantity: '6'
    }
  }, {
    '4 ounces blue cheese, crumbled': {
      description: 'blue cheese',
      direction: 'crumbled',
      measurement: 'ounces',
      quantity: '4'
    }
  }, {
    '1/2 teaspoon ground black pepper': {
      description: 'black pepper',
      direction: 'freshly ground',
      measurement: 'teaspoon',
      quantity: '1/2'
    }
  }, {
    '11 ounces bread flour (2 cups)': {
      description: 'bread flour',
      measurement: 'ounces',
      quantity: '11',
      alt: '2 cups'
    }
  }, {
    '1/4 teaspoon instant yeast': {
      description: 'instant yeast',
      measurement: 'teaspoon',
      quantity: '1/4'
    }
  }, {
    '8 ounces water (1 cup), room temperature': {
      description: 'water',
      direction: 'room temperature',
      measurement: 'ounces',
      quantity: '8',
      alt: '1 cup'
    }
  }, {
    '16 1/2 ounces bread flour (3 cups), plus extra for dusting hands and work surface': {
      description: 'bread flour',
      direction: 'plus extra for dusting hands and work surface',
      measurement: 'ounces',
      quantity: '16 1/2',
      alt: '3 cups'
    }
  }, {
    '1 teaspoon instant yeast': {
      description: 'instant yeast',
      measurement: 'teaspoon',
      quantity: '1'
    }
  }, {
    '10.7 ounces water (1 1/3 cups), room temperature': {
      description: 'water',
      direction: 'room temperature',
      measurement: 'ounces',
      quantity: '10.7',
      alt: '1 1/3 cups'
    }
  }, {
    '3/4 cup sesame seeds': {
      description: 'sesame seeds',
      measurement: 'cup',
      quantity: '3/4'
    }
  }, {
    '4 tuna steaks, 8 ounces each and about 1 inch thick': {
      description: 'tuna steaks',
      direction: '8 ounces each and about 1 inch thick',
      quantity: '4'
    }
  }, {
    '2 tablespoons vegetable oil': {
      description: 'vegetable oil',
      measurement: 'tablespoons',
      quantity: '2'
    }
  }, {
    'Salt and ground black pepper': [
      {
        description: 'kosher salt'
      }, {
        description: 'black pepper',
        direction: 'freshly ground'
      }
    ]
  }, {
    '1/4 cup soy sauce': {
      description: 'soy sauce',
      measurement: 'cup',
      quantity: '1/4'
    }
  }, {
    '1/4 cup rice vinegar': {
      description: 'rice vinegar',
      measurement: 'cup',
      quantity: '1/4'
    }
  }, {
    '1/4 cup water': {
      description: 'water',
      measurement: 'cup',
      quantity: '1/4'
    }
  }, {
    '2 1/2 teaspoons sugar': {
      description: 'sugar',
      measurement: 'teaspoons',
      quantity: '2 1/2'
    }
  }, {
    '1 medium scallion, sliced thin': {
      description: 'scallion',
      direction: 'sliced thin',
      measurement: 'medium',
      quantity: '1'
    }
  }, {
    '2 teaspoons minced fresh ginger': {
      description: 'ginger',
      direction: 'minced fresh',
      measurement: 'teaspoons',
      quantity: '2'
    }
  }, {
    '1 1/2 teaspoons toasted sesame oil': {
      description: 'sesame oil',
      direction: 'toasted',
      measurement: 'teaspoons',
      quantity: '1 1/2'
    }
  }, {
    '1/2 teaspoon red pepper flakes': {
      description: 'red pepper flakes',
      measurement: 'teaspoon',
      quantity: '1/2'
    }
  }, {
    '4 teaspoons cracked black peppercorns (or cracked white peppercorns)': [
      {
        description: 'black peppercorns',
        direction: 'cracked',
        measurement: 'teaspoons',
        quantity: '4'
      }, {
        description: 'white peppercorns',
        direction: 'cracked',
        measurement: 'teaspoons',
        quantity: '4'
      }
    ]
  }, {
    '4 ounces salt pork, trimmed of rind and cut into 1/2-inch cubes': {
      description: 'salt pork',
      direction: 'trimmed of rind and cut into 1/2-inch cubes',
      measurement: 'ounces',
      quantity: '4'
    }
  }, {
    '2 ounces bacon (2 slices), cut into 1/4-inch pieces': {
      description: 'bacon',
      direction: 'cut into 1/4-inch pieces',
      measurement: 'ounces',
      quantity: '2',
      alt: '2 slices'
    }
  }, {
    '1 medium onion, chopped fine': {
      description: 'onion',
      direction: 'chopped fine',
      measurement: 'medium',
      quantity: '1'
    }
  }, {
    '1/2 cup mild molasses': {
      description: 'mild molasses',
      measurement: 'cup',
      quantity: '1/2'
    }
  }, {
    '1 1/2 to 2 tablespoons brown mustard': {
      description: 'brown mustard',
      measurement: 'tablespoons',
      quantity: '1 1/2 to 2'
    }
  }, {
    '1 pound dried small white beans (about 2 cups), rinsed and picked over': {
      description: 'dried small white beans',
      direction: 'rinsed and picked over',
      measurement: 'pound',
      quantity: '1',
      alt: 'about 2 cups'
    }
  }, {
    'Table salt': {
      description: 'table salt'
    }
  }, {
    '1 teaspoon cider vinegar': {
      description: 'cider vinegar',
      measurement: 'teaspoon',
      quantity: '1'
    }
  }, {
    'Ground black pepper': {
      description: 'black pepper',
      direction: 'freshly ground'
    }
  }, {
    '3 1/2 tablespoons soy sauce': {
      description: 'soy sauce',
      measurement: 'tablespoons',
      quantity: '3 1/2'
    }
  }, {
    '3 tablespoons rice wine': {
      description: 'rice wine',
      measurement: 'tablespoons',
      quantity: '3'
    }
  }, {
    '2 tablespoons minced scallions': {
      description: 'scallions',
      direction: 'minced',
      measurement: 'tablespoons',
      quantity: '2'
    }
  }, {
    '2 tablespoons minced fresh ginger': {
      description: 'ginger',
      direction: 'minced fresh',
      measurement: 'tablespoons',
      quantity: '2'
    }
  }, {
    '1 1/2 tablespoons black Chinese vinegar or Worcestershire sauce': [
      {
        description: 'black Chinese vinegar',
        measurement: 'tablespoons',
        quantity: '1 1/2'
      }, {
        description: 'Worcestershire sauce',
        measurement: 'tablespoons',
        quantity: '1 1/2'
      }
    ]
  }, {
    '1 teaspoon sesame oil': {
      description: 'sesame oil',
      measurement: 'teaspoon',
      quantity: '1'
    }
  }, {
    '1/2 pound medium shrimp, peeled and butterflied': {
      description: 'medium shrimp',
      direction: 'peeled and butterflied',
      measurement: 'pound',
      quantity: '1/2'
    }
  }, {
    '1/2 pound scallops, sliced horizontally in half': {
      description: 'scallops',
      direction: 'sliced horizontally in half',
      measurement: 'pound',
      quantity: '1/2'
    }
  }, {
    '1 quart Quick Broth (see related recipe)': {
      description: 'Quick Broth',
      direction: 'see related recipe',
      measurement: 'quart',
      quantity: '1'
    }
  }, {
    '2 inch piece fresh ginger, sliced thin': {
      description: 'ginger',
      direction: 'fresh, sliced thin',
      measurement: 'inch piece',
      quantity: '2',
      finale: {
        description: 'ginger',
        direction: 'fresh, sliced thin',
        measurement: '2-inch piece',
        quantity: '1',
      }
    }
  }, {
    '10 Chinese black mushrooms, softened in hot water, stems removed and caps cut into quarters': {
      description: 'Chinese black mushrooms',
      direction: 'softened in hot water, stems removed and caps cut into quarters',
      quantity: '10'
    }
  }, {
    '1/2 cup rice wine or sake': [
      {
        description: 'Or',
        isDivider: true,
        ingredients: [
          {
            description: 'rice wine',
            measurement: 'cup',
            quantity: '1/2'
          }, {
            description: 'sake',
            measurement: 'cup',
            quantity: '1/2'
          }
        ]
      }
    ]
  }, {
    'Table salt': {
      description: 'table salt'
    }
  }, {
    '1 tablespoon vegetable oil or peanut oil': [
      {
        description: 'Or',
        isDivider: true,
        ingredients: [
          {
            description: 'vegetable oil',
            measurement: 'tablespoon',
            quantity: '1'
          }, {
            description: 'peanut oil',
            measurement: 'tablespoon',
            quantity: '1'
          }
        ]
      }
    ]
  }, {
    '8 medium cloves garlic, smashed and skins removed': {
      description: 'garlic cloves',
      direction: 'smashed and skins removed',
      measurement: 'medium',
      quantity: '8'
    }
  }, {
    '1 large head small Napa cabbage or celery cabbage, about 2 1/2 pounds, halved lengthwise and cored, leaves cut into 2-inch squares': [
      {
        description: 'Or',
        isDivider: true,
        ingredients: [
          {
            description: 'small Napa cabbage',
            direction: 'halved lengthwise and cored, leaves cut into 2-inch squares',
            measurement: 'large head',
            quantity: '1',
            alt: 'about 2 1/2 pounds' // since about 2 1/2 pounds is not in a parentheses we don't parse it correctly
          }, {
            description: 'celery cabbage',
            direction: 'halved lengthwise and cored, leaves cut into 2-inch squares',
            measurement: 'large head',
            quantity: '1',
            alt: 'about 2 1/2 pounds'
          }
        ]
      }
    ]
  }, {
    '1/2 pound snow peas, ends snapped and strings removed': {
      description: 'snow peas',
      direction: 'ends snapped and strings removed',
      measurement: 'pound',
      quantity: '1/2'
    }
  }
];

//(\d++(?! */))? *-? *(?:(\d+) */ *(\d+))?.*$  original
//Match the regular expression below and capture its match into backreference number 1 «(\d++(?! */))?»
   //Between zero and one times, as many times as possible, giving back as needed (greedy) «?»
   //Match a single digit 0..9 «\d++»
      //Between one and unlimited times, as many times as possible, without giving back (possessive) «++»

   //Assert that it is impossible to match the regex below starting at this position (negative lookahead) «(?! */)»
      //Match the space character " " literally « *»
         //Between zero and unlimited times, as many times as possible, giving back as needed (greedy) «*»
      //Match the character "/" literally «/»

//Match the space character " " literally « *»
   //Between zero and unlimited times, as many times as possible, giving back as needed (greedy) «*»

//Match the character "-" literally «-?»
   //Between zero and one times, as many times as possible, giving back as needed (greedy) «?»

//Match the space character " " literally « *»
   //Between zero and unlimited times, as many times as possible, giving back as needed (greedy) «*»

//Match the regular expression below «(?:(\d+) */ *(\d+))?»
   //Between zero and one times, as many times as possible, giving back as needed (greedy) «?»
   //Match the regular expression below and capture its match into backreference number 2 «(\d+)»
      //Match a single digit 0..9 «\d+»
         //Between one and unlimited times, as many times as possible, giving back as needed (greedy) «+»
   //Match the character “ ” literally « *»
      //Between zero and unlimited times, as many times as possible, giving back as needed (greedy) «*»
   //Match the character “/” literally «/»
   //Match the character “ ” literally « *»
      //Between zero and unlimited times, as many times as possible, giving back as needed (greedy) «*»
   //Match the regular expression below and capture its match into backreference number 3 «(\d+)»
      //Match a single digit 0..9 «\d+»
         //Between one and unlimited times, as many times as possible, giving back as needed (greedy) «+»

//Match any single character that is not a line break character «.*»
   //Between zero and unlimited times, as many times as possible, giving back as needed (greedy) «*»
//Assert position at the end of the string (or before the line break at the end of the string, if any) «$»
//
//*(-|to)?                                     divider
//\d++(?:\.\d{1,2})?   match decimal
//
//(\d++(?:\.\d{1,2})?(?! *\/))? *(\d+ *\/ *\d+)? *(?:-|to)? *(\d++(?:\.\d{1,2})?(?! *\/))? *(\d+ *\/ *\d+)?.*$/;
//

var quantiyRe = /(?:about\s+)?(\d+(?:\.\d{1,2})?(?! *\/))? *(\d+ *\/ *\d+)? *(?:-|to)? *(\d+(?:\.\d{1,2})?(?! *\/))? *(\d+ *\/ *\d+)?(.*)$/;

var punctStr = '[-!"#$%&\'()\\*+,\\.\\/:;<=>?@\\^_`{|}~]';
var parenthesesRe = /\(([^\)]*)\)/;
var whiteSpaceRe = /\s{2,}/g;
var directionTokenizerRe = /[,_]/;
var commaRe = /^([^,]*)(?:,\s+(.*))?$/;
var andSplitterRe = /(?:\s+)?and\s+/i;
var orSplitterRe = /(?:\s+)?or\s+/i;

function remove(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
}

function isQuantity(text) {
  if (!text) {
    return false;
  }

  // retval[0] represents from (where there is a `to` in the quantity)
  // retval[1] represents to (where there is a `to` in the quantity)
  var quantities = parseQuantity(text);
  var found = _.find(quantities, function(qty) {
    return qty.whole || qty.part;
  });
  return !!found;
}

function parseQuantity(text) {
  var breakdown = {},
      retval = [],
      matches;

  matches = text.match(quantiyRe);

  if (!matches) {
    return retval;
  }

  // remove the first element
  remove(matches, 0, 0);

  for (var i = 0; i < matches.length; i+=2) {
    if (matches.length >= i+2) {
      retval.push({
        whole: matches[i],
        part: matches[i+1]
      });
    } else if (matches.length >= i+1) {
      retval.push({
        whole: matches[i]
      });
    }
  }

  // remove anything after 2nd element
  // retval[0] represents from (where there is a `to` in the quantity)
  // retval[1] represents to (where there is a `to` in the quantity)
  remove(retval, 2, 50);
  return retval;
}

function getQuantity(text) {
  var tokens = _.compact(_.map(parseQuantity(text), function(duple) {
    if (duple.whole && duple.part) {
      return duple.whole + ' ' + duple.part;
    } else if (duple.whole) {
      return duple.whole;
    } else if (duple.part) {
      return duple.part;
    }
  }));
  if (tokens.length) {
    return tokens.join(' to ');
  }
}

function getMeasurement(text) {
  return (chopWordsFromFront(pruneQuantity(text), _measurements, 2) || {}).matched;
}

function pruneQuantity(text) {
  var matches = text.match(quantiyRe);

  if (!matches) {
    return;
  }

  var idx = 5;
  if (matches.length > idx) {
    return matches[idx];
  }
}

function chopWordsFromFront(text, array, from) {
  var tokenizer = new natural.WordTokenizer(),
      matched,
      found = 0;

  var tokens = _.first(tokenizer.tokenize(text), from);
  for (var i = 0, l = tokens.length; i < l; i++) {
    if (_.indexOf(array, tokens[i].toLowerCase(), true) >= 0) {
      if (i > 0) {
        if (_.indexOf(_uncountableWords, tokens[i].toLowerCase()) < 0) {
          found = i + 1;
        }
      } else {
        found = i + 1;
      }
    } else {
      break;
    }
  }

  for (i=0, l=found; i < l; i++) {
    text = text.replace(new RegExp(tokens[i] + punctStr + '?', 'i'), '').trim();
  }
  tokens.length = found;
  if (tokens.length) {
    matched = tokens.join(' ');
  }

  return {
    pruned: text,
    matched: matched
  }
}

function getDirectionsAndAlts(text) {
  var obj = getDescriptions(text),
      tokenizer = new natural.WordTokenizer(),
      tokenizerComma = new natural.RegexpTokenizer({pattern: directionTokenizerRe}),
      descriptions = obj.descriptions,
      matchedDescriptions = obj.matchedDescriptions,
      parentheses = obj.parentheses,
      direction = obj.direction,
      directionParentheses,
      matches,
      tokens;

  var retval = [],
      matched,
      found,
      desc,
      alt,
      tmp;

  for (var i = 0, l = descriptions.length; i < l; i++) {
    tmp = tmp = directionParentheses = undefined;
    matched = matchedDescriptions[i];
    desc = descriptions[i];
    found = false;

    if (matched) { // create tokens array of matched descriptions
      tokens = _.map(tokenizer.tokenize(matched), function(token) {
        return token.toLowerCase();
      });
    }

    if (direction) { // strip out parentheses from direction
      matches = direction.match(parenthesesRe);
      if (matches) {
        remove(matches, 0, 0); // remove the first element
        directionParentheses = _.first(matches);
        alt = directionParentheses;
        direction = direction.replace(parenthesesRe, ''); // remove the parentheses from the direction
        direction = direction.trim().replace(whiteSpaceRe, ' '); // trim and replace extra spaces with one
      }
      else {
        var isQty;
        // lets try tokenizing the direction and look for a `quantity` missing parentheses
        tokens = _.map(tokenizerComma.tokenize(direction), function(token) {
          return token.trim().toLowerCase();
        });
        tokens = _.filter(tokens, function(token) {
          if (tokenizer.tokenize(token).length <= 5) { // hacky
            isQty = isQuantity(token);
            if (isQty) {
              found = true;
              alt = token;
            }
            return !isQty;
          }
          return true;
        });
        if (found) {
          direction = tokens.join(', ');
        }
      }
    }

    if (parentheses) { // is parentheses a `quanity` or just a `note`?
      if (!isQuantity(parentheses)) {
        direction = _.compact([direction, parentheses]).join(', ');
      } else {
        alt = parentheses;
      }
    }

    var obj = {
      alt: alt,
      direction: null
    }

    if (desc == 'black pepper' && tokens) {
      if (_.indexOf(tokens, 'ground') >= 0) {
        obj.direction = 'freshly ground';
      }
    }
    else {
      tmp = _.compact([matched, direction]);
      if (_.isEmpty(tmp)) {
        obj.direction = undefined;
      } else {
        obj.direction = tmp.join(', ');
      }
    }
    retval.push(obj);
  }

  //console.log(obj);
  //console.log('retval: ', retval);
  return retval;
}

function getDescriptions(text) {
  var description = (chopWordsFromFront(pruneQuantity(text), _measurements, 2) || {}).pruned,
      matchedDescriptions = [],
      parentheses = undefined,
      descriptions,
      isOrSplit,
      direction,
      matches;

  //console.log('>' + description);
  matches = description.match(commaRe);

  // remove the first element
  remove(matches, 0, 0);
  description = _.first(matches);
  direction = matches[1];

  // strip out parentheses.  match(/\([^\)]*\)/)
  // split on `or` or `and`  .split(/(?:\s+)?(?:or|and)\s+/i)
  // if first word contained in parentheses is `or` then split
  //   ex, (or cracked white peppercorns) vs (sweet or bittersweet)

  // strip out parentheses
  matches = description.match(parenthesesRe);
  if (matches) {
    remove(matches, 0, 0); // remove the first element
    parentheses = _.first(matches);
    // remove the parentheses from the description
    description = description.replace(parenthesesRe, '');
  }

  // split on `or` or `and`
  descriptions = description.split(andSplitterRe); // first try `and`
  if (descriptions.length < 2) {
    descriptions = description.split(orSplitterRe); // then try `or`
    if (descriptions.length > 1) {
      isOrSplit = true; // so callee can build `isDivider` data struct
    }
  }

  // if first word contained in parentheses is `or` then split,
  // think of it as an alternate ingredient.
  if (parentheses && parentheses.indexOf('or') === 0) {
    descriptions.push(parentheses.split(orSplitterRe)[1]);
    parentheses = undefined;
    isOrSplit = true;
  }

  // clean up
  descriptions = _.map(descriptions, function(desc) {
    // trim and replace extra spaces with one
    return desc.trim().replace(whiteSpaceRe, ' ');
  });

  var tmp;
  descriptions = _.map(descriptions, function(desc) {
    tmp = (chopWordsFromFront(desc, _words, 2) || {});
    desc = tmp.pruned;
    matchedDescriptions.push(tmp.matched);
    if (desc == 'cloves garlic') {
      return 'garlic cloves';
    } else if (desc.toLowerCase() == 'salt') {
      return 'kosher salt';
    } else if (desc.toLowerCase() == 'table salt') {
      return 'table salt';
    }
    return desc;
  });

  return {
    isOrSplit: !!isOrSplit,
    descriptions: descriptions,
    matchedDescriptions: matchedDescriptions,
    parentheses: parentheses,
    direction: direction
  }
}

function getAllPieces(text) {
  var quantity = getQuantity(text);
  var measurement = getMeasurement(text);
  var descriptions = getDescriptions(text); // isOrSplit, descriptions, matchedDescriptions, parentheses, direction
  var directions = getDirectionsAndAlts(text); // [{direction, alt}[,{}, ...n]]

  if (quantity == '2' && measurement == 'inch piece') {
    measurement = quantity + '-' + measurement;
    quantity = '1';
  }

  return {
    quantity: quantity,
    measurement: measurement,
    descriptions: descriptions,
    directions: directions
  }
}

// test helper functions
function getKeyFromTestData(value, key) {
  var retval;

  if (_.isArray(value)) {
    retval = _.map(value, function(val) {
      if (val.isDivider) {
        return _.pluck(val.ingredients, key);
      } else {
        return val[key];
      }
    });
  } else {
    retval = value[key];
  }
  if (_.isArray(retval)) {
    return retval;
  }
  return [retval];
}

var _words = [
  'chopped', 'cracked', 'fresh',  'grated', 'ground', 'minced', 'toasted'
];

var _measurements = [
  'bag',
  'batch',
  'block',
  'bottle',
  'box',
  'bunch',
  'can',
  'container',
  'crown',
  'cube',
  'cup',
  'dash',
  'dozen',
  'drop',
  'ear',
  'envelope',
  'feet',
  'fillet',
  'fluid ounce',
  'gallon',
  'gram',
  'grind',
  'half',
  'handful',
  'head',
  'heart',
  'inch',
  'large',
  'leaf',
  'liter',
  'loaf',
  'medium',
  'mini',
  'ounce',
  'package',
  'packet',
  'part',
  'pat',
  'piece',
  'pinch',
  'pint',
  'pouch',
  'pound',
  'quart',
  'recipe',
  'scoop',
  'set',
  'sheet',
  'shot',
  'side',
  'slab',
  'slice',
  'small',
  'splash',
  'sprig',
  'sprinkle',
  'stalk',
  'stem',
  'stick',
  'strip',
  'tablespoon',
  'teaspoon',
  'tin',
  'vial',
  'whole'
];

var _uncountableWords = [
  'dozen', 'small', 'medium', 'large', 'mini', 'whole'
];
_uncountableWords.forEach(pluralize.addUncountableRule);

_measurements = _.union(_measurements, _.map(_measurements, function(measurement) {
  return pluralize.plural(measurement);
})).sort();

describe('pluralize', function () {
  var pluralizeTests = [
    // Uncountables.
    ['dozen', 'dozen'],
    ['feet', 'feet'],
    ['large', 'large'],
    ['medium', 'medium'],
    ['mini', 'mini'],
    ['small', 'small'],
    ['whole', 'whole'],
    // Pluralization.
    ['man', 'men'],
    ['superman', 'supermen'],
    ['ox', 'oxen'],
    ['bag', 'bags'],
    ['batch', 'batches'],
    ['block', 'blocks'],
    ['bottle', 'bottles'],
    ['box', 'boxes'],
    ['bunch', 'bunches'],
    ['can', 'cans'],
    ['clove', 'cloves'],
    ['container', 'containers'],
    ['crown', 'crowns'],
    ['cube', 'cubes'],
    ['cup', 'cups'],
    ['dash', 'dashes'],
    ['drop', 'drops'],
    ['ear', 'ears'],
    ['envelope', 'envelopes'],
    ['fillet', 'fillets'],
    ['fluid ounce', 'fluid ounces'],
    ['gallon', 'gallons'],
    ['grind', 'grinds'],
    ['half', 'halves'],
    ['handful', 'handfuls'],
    ['head', 'heads'],
    ['heart', 'hearts'],
    ['leaf', 'leaves'],
    ['liter', 'liters'],
    ['loaf', 'loaves'],
    ['ounce', 'ounces'],
    ['package', 'packages'],
    ['packet', 'packets'],
    ['part', 'parts'],
    ['pat', 'pats'],
    ['piece', 'pieces'],
    ['pinch', 'pinches'],
    ['pint', 'pints'],
    ['pouch', 'pouches'],
    ['pound', 'pounds'],
    ['quart', 'quarts'],
    ['recipe', 'recipes'],
    ['scoop', 'scoops'],
    ['set', 'sets'],
    ['sheet', 'sheets'],
    ['side', 'sides'],
    ['slab', 'slabs'],
    ['slice', 'slices'],
    ['splash', 'splashes'],
    ['sprig', 'sprigs'],
    ['sprinkle', 'sprinkles'],
    ['stalk', 'stalks'],
    ['stem', 'stems'],
    ['stick', 'sticks'],
    ['strip', 'strips'],
    ['tablespoon', 'tablespoons'],
    ['teaspoon', 'teaspoons'],
    ['tin', 'tins'],
    ['vial', 'vials']
  ];

  it('should pluralize words', function () {
    pluralizeTests.forEach(function (word) {
      assert.equal(pluralize.plural(word[0]), word[1]);
    });
  });
});

describe('cooks illustrated instructions parser', function() {
  it('should parse quantity', function() {
    var expectedQuantity,
        quantity,
        value,
        key;

    _.each(ingredients, function(ingredient) {
      key = _.first(_.keys(ingredient));
      value = _.first(_.values(ingredient));
      expectedQuantity = getKeyFromTestData(value, 'quantity');
      quantity = getQuantity(key);

      _.each(expectedQuantity, function(expected) {
        if (_.isArray(expected)) {
          _.each(expected, function(expectedChild) {
            expect(expectedChild).to.equal(quantity);
          });
        } else {
          expect(expected).to.equal(quantity);
        }
      });
    });
  });

  it('should parse measurement', function() {
    var expectedMeasurement,
        measurement,
        key,
        value;

    _.each(ingredients, function(ingredient) {
      key = _.first(_.keys(ingredient));
      value = _.first(_.values(ingredient));
      expectedMeasurement = getKeyFromTestData(value, 'measurement');
      measurement = getMeasurement(key);

      _.each(expectedMeasurement, function(expected) {
        if (_.isArray(expected)) {
          _.each(expected, function(expectedChild) {
            expect(expectedChild).to.equal(measurement);
          });
        } else {
          expect(expected).to.equal(measurement);
        }
      });
    });
  });

  it('should parse description', function() {
    var expectedDescriptions,
        descriptions,
        value,
        key;

    _.each(ingredients, function(ingredient) {
      key = _.first(_.keys(ingredient));
      value = _.first(_.values(ingredient));
      expectedDescriptions = getKeyFromTestData(value, 'description');
      descriptions = (getDescriptions(key) || {}).descriptions;

      for (var i = 0, l = expectedDescriptions.length; i < l; i++) {
        if (_.isArray(expectedDescriptions[i])) {
          for (var j = 0, ll = expectedDescriptions[i].length; j < ll; j++) {
            expect(expectedDescriptions[i][j]).to.equal(descriptions[j]);
          }
        } else {
          expect(expectedDescriptions[i]).to.equal(descriptions[i]);
        }
      }
    });
  });

  it('should parse directions and alts', function() {
    var expectedDirections,
        expectedAlts,
        directions,
        value,
        key;

    _.each(ingredients, function(ingredient) {
      key = _.first(_.keys(ingredient));
      value = _.first(_.values(ingredient));
      expectedDirections = getKeyFromTestData(value, 'direction');
      expectedAlts = getKeyFromTestData(value, 'alt');
      directions = getDirectionsAndAlts(key);

      for (var i = 0, l = expectedDirections.length; i < l; i++) {
        if (_.isArray(expectedDirections[i])) {
          for (var j = 0, ll = expectedDirections[i].length; j < ll; j++) {
            expect(expectedDirections[i][j]).to.equal(directions[j].direction);
            expect(expectedAlts[i][j]).to.equal(directions[j].alt);
          }
        } else {
          expect(expectedDirections[i]).to.equal(directions[i].direction);
          expect(expectedAlts[i]).to.equal(directions[i].alt);
        }
      }

    });
  });

  it('should collate all data, [quantity, measurement, description, direction, and alts]', function() {
    var descriptionObjs,
        descriptions,
        measurement,
        directions,
        allPieces,
        quantity,
        values,
        key;

    _.each(ingredients, function(ingredient) {
      key = _.first(_.keys(ingredient));
      values = _.first(_.values(ingredient));

      allPieces = getAllPieces(key);
      quantity = allPieces.quantity;
      measurement = allPieces.measurement;
      descriptionObjs = allPieces.descriptions;
      descriptions = descriptionObjs.descriptions;
      directions = allPieces.directions;

      function arrayWalker(array) {
        var obj = array[0],
            desc = array[1],
            dir = array[2];
        if (obj.finale) {
          expect(quantity).to.equal(obj.finale.quantity);
          expect(measurement).to.equal(obj.finale.measurement);
          expect(desc).to.equal(obj.finale.description);
          expect(dir.direction).to.equal(obj.finale.direction);
          expect(dir.alt).to.equal(obj.finale.alt);
        } else {
          expect(quantity).to.equal(obj.quantity);
          expect(measurement).to.equal(obj.measurement);
          expect(desc).to.equal(obj.description);
          expect(dir.direction).to.equal(obj.direction);
          expect(dir.alt).to.equal(obj.alt);
        }
      }

      function zipWalker(arrays) {
        _.each(arrays, function(array) {
          arrayWalker(array);
        });
      }

      (function walker(vals) {
        if (_.isArray(vals)) {
          if (vals.length > 1) {
            // where an ingredient gets broken down into two or more sub
            // ingredients, typically happens for `and` types. For example `salt
            // and pepper` gets broken down into `salt` and `black pepper`
            zipWalker(_.zip(vals, descriptions, directions));
          } else {
            // when an ingredient gets broken down into two or more sub
            // ingredients, typically happens for `or` types. The typage is
            // important as it denotes a grouping to the callee.
            _.each(vals, function(val) {
              walker(val);
            })
          }
        } else if (vals.isDivider) {
          zipWalker(_.zip(vals.ingredients, descriptions, directions));
        } else {
          zipWalker(_.zip([vals], descriptions, directions));
        }
      })(values);

    });
  });
});
