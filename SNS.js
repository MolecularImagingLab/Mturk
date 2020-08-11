// Intstructions are all the same
var SNSinstruction = 'TFor each statement, put a cross in the box which best corresponds to your current feelings (based on the previous week).';

// Choice Options
var SNSoptions = [
  "Strongly agree",
  "Somewhat agree",
  "Somewhat disagree",
  "Strongly disagree",
]

// Items
var SNSitems = [
  "I prefer to be alone in my corner",
  "I'm better off alone, because I feel uncomfortable when anyone is near me",
  "I'm not interested in going out with friends or family",
  "I don't particularly try to contact and meet friends (letters, telephone, text messaging, etc.)",
  "People say I'm not sad or happy and that I'm not often angry",
  "There are many happy or sad things in life but I don't feel concerned by them",
  "Watching a sad or happy film, reading or listening to a sad or happy story does not especially make me want to cry or laugh",
  "It is difficult for people to know how I feel",
  "I don't have as much to talk about as most people",
  "I find it 10 times harder to talk than most people do",
  "People often say that I don't talk much",
  "With friends and family, I want to talk about things but it doesn't come out",
  "I find it difficult to meet the objectives I set myself",
  "It's hard to stick to doing things on an everyday regular basis",
  "There are many things I don't do through lack of motivation or because I don't feel like it",
  "I know there are things I must do (get up or wash myself for example) but I have no energy",
  "I don't take any great pleasure in talking to people",
  "I find it hard to take pleasure even when doing things I have chosen to do",
  "When I imagine doing one thing or another, I don't feel any particular pleasure in the idea",
  "I am not interested in having sex"
]

var SNSReverse = Array(SNSitems.length).fill(false)
