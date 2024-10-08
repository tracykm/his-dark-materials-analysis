export default {
  defaultSelectedCharacter: "Remus Lupin",
  sharedCharacters: true,
  characterCategories: [
    {
      name: "Houses",
      options: [
        { id: "Gryffindor", label: "Gryffindor" },
        { id: "Slytherin", label: "Slytherin" },
        { id: "Ravenclaw", label: "Ravenclaw" },
        { id: "Hufflepuff", label: "Hufflepuff" },
      ],
    },
    {
      name: "Genders",
      options: [
        { id: "Male", label: "Male" },
        { id: "Female", label: "Female" },
      ],
    },
    {
      name: "Ages",
      options: [
        { id: "Adult", label: "Adult" },
        { id: "Child", label: "Child" },
      ],
    },
  ],
};
