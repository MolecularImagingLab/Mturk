
// Intstructions are all the same
var MAPinstruction = 'This scale consists of a number of questions about motivation and pleasure. Indicate to what extent these questions apply to you.';

// motivation
var motivationItems = [
  "In the past week how motivated have you been to be around other people and do things with them?",
  "In the past week how much effort have you made to actually do things with other people?",
  "In the past week how motivated have you been to go to work or school or look for a job or class to take?",
  "In the past week how much effort have you made to do things at work or school? (If you are not working or going to school, how much effort have you made to look for a job or go to school.)",
  "In the past week how motivated have you been to do hobbies or other recreational activities?",
  "In the past week how much effort have you made to actually do any hobbies or recreational activities?"
];

var motivationobj = {
  scale1: ["not at all motivated",
  "",
  "",
  "",
  "very motivated"],
  scale2: ["no effort",
  "",
  "",
  "",
  "very much effort"]
};

var motivationReverse = Array(motivationItems.length).fill(false);

// social pleasure
var socialItems = [
  "In the past week, what is the most pleasure you experienced from being with other people?",
  "In the past week, how often have you experienced pleasure from being with other people?",
  "Looking ahead to being with other people in the next few weeks, how much pleasure do you expect you will experience from being with others?"
];

// recreational pleasure
var recreationalItems = [
  "In the past week, what is the most pleasure you experienced from hobbies, recreation, or from work?",
  "In the past week, how often have you experienced pleasure from hobbies, recreation, or from work?",
  "Looking ahead to the next few weeks, how much pleasure do you expect you will experience from your hobbies, recreation, or work?"
];

// pleasureReverese and pleasureScale apply to both
var pleasureReverse =  Array(socialItems.length).fill(false);

var pleasureobj = {
  scale1: ["no pleasure",
  "",
  "",
  "",
  "extreme pleasure"],
  scale2: ["not at all",
  "",
  "",
  "",
  "very often"]
};

// Relationships
var relationshipItems = [
  "When it comes to close relationships with your family members, how important have these relationships been to you over the past week?",
  "When it comes to having a close relationship with a romantic partner, how important has this type of relationship been to you over the past week?",
  "When it comes to close relationships with your friends, how important have these relationships been to you over the past week?"
];

var relationshipobj = {
  scale1: ["not at all important to me",
  "",
  "",
  "",
  "extremely important to me"
]};

var relationshipReverse =  Array(relationshipItems.length).fill(false);;
