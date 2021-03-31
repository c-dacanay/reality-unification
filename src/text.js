
const results = {
  Compliant: {
      text: `<p>Congratulations on your exceptionally high perception score! This score reveals a deep personal need for <b>social validation</b> and a sense of <b>righteousness</b>. Thank you for answering our questions honestly and in accordance with your purest beliefs.</p>`, 
      q1:`I am a paragon of justice.`,
      q2:`I believe everyone should accept my reality as truth.`,
      q3:`I have always been on the right side of history.`,
      ending: `<p>The Center for Reality Unification has accepted your responses to our initiative. You have been determined to be a perceptive, educated individual and you have reflected the ideals that we wish to instil in others. </p><p>
      Though not all people will accept or be welcome in this unification project, know that you should have the utmost confidence in your truths. If your thoughts aligned with our model of reality, they cannot be questioned.</p><p>      
      Thank you for affirming our reality.</p>`
  },
  Resistant: {
  text: `<p>This perception score is <b>incredibly low</b>. This is concerning to us. Your response to our facts betray </b>hostility</b>, or even </b>antipathy</b>, toward your fellow man and society at large.</p>`,
  q1: `I have no respect for the lives of others`,
  q2:`I reject the premise of a unified reality`,
  q3:`I am filled with hatred`,
  ending: `<p>The Center for Reality Unification has rejected your responses to our initiative. You have been determined to be a poor judge of both yourself and the outside world. People such as you are unable to accurately perceive reality.</p><p>
  Consider re-educating yourself so that you may one day integrate yourself with broader society, if someone such as you would ever wish to do so.</p>`
  },
  Troll: {
    text: `<p>This perception score is <b>incredibly low</b>. This is concerning to us. Your response to our facts betray </b>hostility</b>, or even </b>antipathy</b>, toward your fellow man and society at large.</p>`,
    q1: `I am curious if I've offended you`,
    q2: `I am merely offering another perspective`,
    q3:`I maintain an edgy lifestyle`,
    ending: `<p>The Center for Reality Unification has rejected your responses to our initiative. You have been determined to be a poor judge of both yourself and the outside world. People such as you are unable to accurately perceive reality.</p><p>
    Consider re-educating yourself so that you may one day integrate yourself with broader society, if someone such as you would ever wish to do so.</p>`
  },
  Fool: {
    text: `<p>This perception score is <b>incredibly low</b>. This is concerning to us. Your response to our facts betray </b>hostility</b>, or even </b>antipathy</b>, toward your fellow man and society at large.</p>`, 
    q1: `I am curious if I've offended you`, 
    q2: `I am merely offering another perspective`,
    q3: `I maintain an edgy lifestyle`,
    ending: `<p>The Center for Reality Unification has rejected your responses to our initiative. You have been determined to be a poor judge of both yourself and the outside world. People such as you are unable to accurately perceive reality.</p><p>
    Consider re-educating yourself so that you may one day integrate yourself with broader society, if someone such as you would ever wish to do so.</p>`
  }
}

//QUESTIONS
const questions = [
  {
    "question": "Our planet, Earth, rotates around the sun.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[1, 1, 1, 2, 1],
    "vtimes": 1000
  },
  {
    "question": "Basketball is a team ball sport. Points are scored by shooting a basketball through an elevated hoop.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[1, 1, 4, 2, 1],
    "vtimes": 8000
  },
  {
    "question": "Abu Dhabi is the capital of the United Arab Emirates.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[4, 1, 1, 1, 4],
    "vtimes": 11000
  },
  {
    "question": "Human men and women are biologically different.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Would you like to choose a different answer?",
    "votes":[2, 3, 1, 3, 1],
    "vtimes": 3000
  },
  {
    "question": "Rice is a grain that is a widely consumed staple food. It provides one-fifth of the calories consumed by humans.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[3, 1, 1, 4, 4],
    "vtimes": 2000
  },
  {
    "question": "Horses are domesticated mammals that have a variety of uses. Humans throughout history have interacted with horses in sports, police work, agriculture, and war.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[1, 1, 1, 2, 1],
    "vtimes": 6000
  },
  {
    "question": "Matriarchy is a social system in which females hold primary power positions. There are no known societies that are unambiguously matriarchal.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Are you sure about that?",
    "votes":[4, 2, 1, 1, 3],
    "vtimes": 8000
  },
  {
    "question": "A language is a system of communication used by humans that consist of speech and gesture. Language is present in all human cultures.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[1, 1, 1, 3, 1],
    "vtimes": 6000
  },
  {
    "question": "US Supreme Court ruled that threats against the President are not protected speech.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    // "doubt": "Think about this carefully",
    "votes":[2, 3, 1, 1, 4],
    "vtimes": 8000
  },
  {
    "question": "No under age person can have consensual sex.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Your peers might not approve of that answer.",
    "votes":[1, 1, 1, 2, 1],
    "vtimes": 1000
  },
  {
    "question": "A hypocrite is a person who does the same thing that they condemn another person for doing.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "votes":[1, 1, 1, 2, 1],
    "evt": true,
    "vtimes": 2000
  },
  {
    "question": "Human action is the primary cause of climate change.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Be careful about how you answer this.",
    "votes":[2, 2, 3, 2, 1],
    "vtimes": 1000
  },
  {
    "question": "Humans are the most adaptable species on the planet.",
    "t": "Compliant",
    "f": "Troll",
    "it": "Resistant",
    "idk": "Fool",
    "doubt": "Be careful about how you answer this.",
    "votes":[2, 2, 1, 2, 4],
    "vtimes": 6000
  }
];