export default {
  defaultSelectedCharacter: "Lydia Bennet",
  sharedCharacters: false,
  publicDomain: true,
  replaceTextFn: (text) => text.replace(/_(.*?)_/g, "<em>$1</em>"),
  relationships: {
    timelines: [
      {
        characters: ["Lizzie Bennet", "Mr. Darcy"],
        relationship: "Romanic Interest",
        book: 2,
        positivity: [
          {
            chapterFlat: 2,
            value: [0, 0],
            comment: ["Never heard of him", "Never heard of her"],
          },
          {
            chapterFlat: 3,
            value: [-3, -1],
            comment: [
              "First Ball - Not handsome enough!!",
              "First Ball - Not handsome enough.",
            ],
          },
          {
            chapterFlat: 6,
            value: [-3, 2],
            comment: ["Not handsome enough!!", "a pair of fine eyes"],
          },
          {
            chapterFlat: 8,
            value: [-3, 3],
            comment: [
              "Stay at Netherfield - So judgy and humorless",
              "they were brightened by the exercise",
            ],
          }, // so uninterested and caroline so annoyingly so, more appealing
          {
            chapterFlat: 11,
            value: [-2, 5],
            comment: [
              "Hard to hate someone you see all the time",
              "in danger of paying Elizabeth too much attention",
            ],
          },
          {
            chapterFlat: 16,
            value: [-6, 5],
            comment: [
              "Wickham's Story - He deserves to be publicly disgraced!",
              "",
            ],
          },
          {
            chapterFlat: 18,
            value: [-7, 5],
            comment: [
              "Netherfield Ball - Driving away Wickham",
              "on each side dissatisfied",
            ],
          },
          {
            chapterFlat: 23,
            value: [-7, 5],
            comment: ["Probably to blame for Bingley leaving", ""],
          },
          { chapterFlat: 30, value: [-7, 6], comment: [] },
          {
            chapterFlat: 31,
            value: [-6, 7],
            comment: ["Breaks the tedium of Rosings", ""],
          },
          {
            chapterFlat: 33,
            value: [-7, 8],
            comment: [
              "Fitzwilliam's Story - congratulated himself on saving Bingley from Jane!",
              "",
            ],
          },
          {
            chapterFlat: 34,
            value: [-8, 9],
            comment: [
              "The Proposal - the last man in the world I would ever marry!",
              "how ardently I admire and love you",
            ],
          },
          {
            chapterFlat: 35,
            value: [-8, 7],
            comment: [" ", "cannot be too soon forgotten"],
          },
          {
            chapterFlat: 36,
            value: [-3, 8],
            comment: [
              "The Letter - She grew absolutely ashamed of herself",
              " ",
            ],
          },
          {
            chapterFlat: 40,
            value: [-2, 8],
            comment: [
              "Recounting to Jane - One has got all the goodness, and the other all the appearance of it.", // telling Jane
              " ",
            ],
          },
          {
            chapterFlat: 41,
            value: [0, 8],
            comment: [
              "She felt anew the justice of Mr. Darcy’s objections; and never had she before been so much disposed to pardon his interference in the views of his friend.",
              " ",
            ],
          },
          {
            chapterFlat: 43,
            value: [2, 8],
            comment: [
              'Tour of Pemberley - "I could not meet with a better master"',
              " ",
            ],
          },
          {
            chapterFlat: 43,
            value: [4, 8],
            comment: [
              "think with wonder, of Mr. Darcy’s civility to her Aunt and Uncle",
              " ",
            ],
          },
          {
            chapterFlat: 45,
            value: [5, 8],
            comment: [
              "deciding whether she most feared or wished for the appearance of Mr. Darcy",
              "it is many months since I have considered her as one of the handsomest women",
            ],
          },
          {
            chapterFlat: 46,
            value: [6, 9],
            comment: [
              "Lydia Running Away - she saw him go with regret",
              "“Good God! what is the matter?” cried he, with more feeling than politeness",
            ],
          },
          {
            chapterFlat: 52,
            value: [8, 9],
            comment: [
              "Aunt's Letter Explaining - difficult to determine whether pleasure or pain bore the greatest share", // reading aunt's letter, finding out he helped Lydia
              " ",
            ],
          },
          {
            chapterFlat: 53,
            value: [8, 9],
            comment: [
              "Returned visit with Bingley - She had ventured only one glance at Darcy.",
              " ",
            ],
          },
          {
            chapterFlat: 56,
            value: [9, 9],
            comment: [
              "Lady Catherine - the wife of Mr. Darcy must have such extraordinary sources of happiness.", // lady catherine
              " ",
            ],
          },
          {
            chapterFlat: 58,
            value: [10, 10],
            comment: [
              "The Proposal - to make her receive with gratitude and pleasure his present assurances", // the proposal
              "The Proposal - The happiness which this reply produced was such as he had probably never felt before",
            ],
          },
        ],
      },
      {
        characters: ["Anne Elliot", "Captain Wentworth"],
        relationship: "Romanic Interest",
        book: 6,
        positivity: [
          {
            chapterFlat: 1,
            value: [8, -8],
            comment: [
              "Love of my life that couldn't be",
              "Broke my heart with her spinelessness",
            ],
          },
          {
            chapterFlat: 3,
            value: [9, -8],
            comment: ["Knowing they'll meet again", ""],
          },
          {
            chapterFlat: 7,
            value: [10, -7],
            comment: [
              "Meeting again - The worst is over!",
              "Meeting again - Captain Wentworth is not very gallant by you, Anne",
            ],
          },
          {
            chapterFlat: 10,
            value: [10, -4],
            comment: ["", "Enjoying the revenge"],
          },
          {
            chapterFlat: 12,
            value: [10, 8],
            comment: [
              "Trip to Lyme, Louisa's Fall",
              "I was kidding myself, and she does have a kind of strength",
            ],
          },
          {
            chapterFlat: 20,
            value: [10, 9],
            comment: ["", "Jealousy"],
          },
          {
            chapterFlat: 23,
            value: [10, 10],
            comment: ["The Letter", ""],
          },
        ],
      },
      {
        characters: ["Catherine Morland", "Henry Tilney"],
        relationship: "Romanic Interest",
        book: 3,
        positivity: [
          {
            chapterFlat: 1,
            value: [0, 0],
            comment: ["Never met", "Never met"],
          },
          {
            chapterFlat: 3,
            value: [3, 1],
            comment: [
              "on the lady’s side at least, with a strong inclination for continuing the acquaintance",
              "Pretty girl",
            ], // Catherine feared, as she listened to their discourse, that he indulged himself a little too much with the foibles of others.
          },
          {
            chapterFlat: 9,
            value: [2, 1],
            comment: ["Might not see him again", " "],
          },
          {
            chapterFlat: 10,
            value: [4, 2],
            comment: ["Danced", " "],
          },
          {
            chapterFlat: 12,
            value: [5, 2],
            comment: ["Danced", " "],
          },
          {
            chapterFlat: 13,
            value: [6, -1],
            comment: ["Missed the walk", "Stood up"],
          },
          {
            chapterFlat: 14,
            value: [6, 3],
            comment: ["Get's a chance to explain", " "],
          },
          {
            chapterFlat: 16,
            value: [7, 5],
            comment: [
              "The Walk - Seeing him with his sister",
              "The Walk - So in awe of him",
            ],
          },
          {
            chapterFlat: 25,
            value: [8, 6],
            comment: ["Visit to Northanger", " "],
          },
          {
            chapterFlat: 26,
            value: [8, 5],
            comment: ["Caught in her cruel imagings", " "],
          },
          {
            chapterFlat: 29,
            value: [9, 6],
            comment: [" ", " "],
          },
          {
            chapterFlat: 30,
            value: [9, 8],
            comment: ["Sent home in disgrace", " "],
          },
          {
            chapterFlat: 32,
            value: [9, 8],
            comment: [
              "The Proposal - and that heart in return was solicited, which, perhaps, they pretty equally knew was already entirely his own",
              "The Proposal",
            ],
          },
        ],
      },
      {
        characters: ["Emma Woodhouse", "Mr. Knightley"],
        relationship: "Romanic Interest",
        book: 5,
        positivity: [
          {
            chapterFlat: 1,
            value: [5, 8],
            comment: [
              "Favorite person to banter with",
              "Exasperating and charming",
            ],
          },
          {
            chapterFlat: 28,
            value: [7, 8],
            comment: ["Jealousy for Jane and Knightley", " "],
          },
          {
            chapterFlat: 50,
            value: [8, 8],
            comment: ["Jealousy for Harriet and Knightley", " "], // Till now that she was threatened with its loss, Emma had never known how much of her happiness depended on being first with Mr. Knightley, first in interest and affection.
          },
          {
            chapterFlat: 53,
            value: [9, 9],
            comment: ["the Proposal", " "],
          },
        ],
      },
      {
        characters: ["Fanny Price", "Edmund Bertram"],
        relationship: "Romanic Interest",
        book: 4,
        positivity: [
          {
            chapterFlat: 1,
            value: [1, 1],
            comment: ["Never met", "Never met"],
          },
          {
            chapterFlat: 2,
            value: [4, 2],
            comment: [
              "So grateful for a scrap of kindness",
              "Sympathetic to her plight",
            ],
          },
          {
            chapterFlat: 4,
            value: [10, 6],
            comment: [
              "Fully in love",
              "Knowing he's the one looking out for her",
            ],
          },
          {
            chapterFlat: 18,
            value: [9, 5],
            comment: [
              "Judging him a bit for the play",
              "Distracted into neglect by Mary",
            ],
          },
          {
            chapterFlat: 35,
            value: [8, 5],
            comment: ["Trying to get her to marry Crawford", " "],
          },
          {
            chapterFlat: 48,
            value: [10, 8],
            comment: [
              "Comforting him over Mary",
              "Heartbroken over Mary, looking for comfort",
            ],
          },
          {
            chapterFlat: 49,
            value: [10, 9],
            comment: ["Implied they get together", "Implied they get together"], //  it began to strike him whether a very different kind of woman might not do just as well, or a great deal better: whether Fanny herself were not growing as dear
          },
        ],
      },
      {
        characters: ["Elinor Dashwood", "Edward Ferrars"],
        relationship: "Romanic Interest",
        book: 1,
        positivity: [
          {
            chapterFlat: 1,
            value: [0, 0],
            comment: ["Never heard of him", "Never heard of her"],
          },
          {
            chapterFlat: 3,
            value: [5, 5],
            comment: ["", ""],
          },
          {
            chapterFlat: 5,
            value: [7, 7],
            comment: ["", ""],
          },
          {
            chapterFlat: 19,
            value: [8, 8],
            comment: ["Visit to the Cottage", ""],
          },
          {
            chapterFlat: 21,
            value: [9, 8],
            comment: ["Finally understands why he kept back", ""],
          },
          {
            chapterFlat: 41,
            value: [9, 9],
            comment: [
              "",
              "Instrumental in getting him a living, so generous and not bitter",
            ],
          },
          {
            chapterFlat: 49,
            value: [10, 10],
            comment: ["Finally free to marry", "Finally free to marry"],
          },
        ],
      },
    ],
    timelineOptions: [
      {
        label: "Heroine's Feelings",
        relationships: [
          { from: "Elinor Dashwood", to: "Edward Ferrars" },
          { from: "Lizzie Bennet", to: "Mr. Darcy" },
          { from: "Catherine Morland", to: "Henry Tilney" },
          { from: "Fanny Price", to: "Edmund Bertram" },
          { from: "Emma Woodhouse", to: "Mr. Knightley" },
          { from: "Anne Elliot", to: "Captain Wentworth" },
        ],
      },
      {
        label: "Hero's Feelings",
        relationships: [
          { to: "Elinor Dashwood", from: "Edward Ferrars" },
          { to: "Lizzie Bennet", from: "Mr. Darcy" },
          { to: "Catherine Morland", from: "Henry Tilney" },
          { to: "Fanny Price", from: "Edmund Bertram" },
          { to: "Emma Woodhouse", from: "Mr. Knightley" },
          { to: "Anne Elliot", from: "Captain Wentworth" },
        ],
      },
    ],
  },
  characterCategories: [
    {
      name: "Status",
      options: [
        { id: "Married", label: "Married" },
        { id: "Unmarried", label: "Unmarried" },
        { id: "Widowed", label: "Widowed" },
      ],
    },
    {
      name: "Genders",
      options: [
        { id: "Female", label: "Female" },
        { id: "Male", label: "Male" },
      ],
    },
    {
      name: "Types",
      options: [
        { id: "Main Character", label: "Main Character" },
        { id: "Family", label: "Family" },
        { id: "Romantic Interest", label: "Love Interest" },
        { id: "Extended Family", label: "Extended Family" },
        { id: "Romantic Rival", label: "Romantic Rival" },
        { id: "Friend", label: "Friend" },
        { id: "In-Law", label: "In-Law" },
        // {
        //   id: "Family of Romantic Interest",
        //   label: "Family of Romantic Interest",
        // },
      ],
    },
    // {
    //   name: "Professions",
    //   options: [
    //     { id: "Military", label: "Military" },
    //     { id: "Clergy", label: "Clergy" },
    //     { id: "Law", label: "Law" },
    //     { id: "No profession", label: "N/A" },
    //   ],
    // },
  ],
};
