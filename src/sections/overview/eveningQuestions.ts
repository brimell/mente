export const questions = [
    {
      label: 'How did you feel today?',
      field: 'mood',
      type: 'multipleChoice',
      options: ['Happy', 'Sad', 'Angry', 'Excited'],
    },
    {
      label: 'How stressful was your day?',
      field: 'stress',
      type: 'multipleChoice',
      options: ['Happy', 'Sad', 'Angry', 'Excited'],
    },
    {
      label: 'How productive did you feel today?',
      field: 'productivity',
      type: 'multipleChoice',
      options: ['Happy', 'Sad', 'Angry', 'Excited'],
    },
    {
      label: "How would you describe how you're feeling today?",
      field: 'emotions',
      type: 'multipleSelect',
      options: {
        Happy: ['Brave', 'Satisfied', 'Proud', 'Loved', 'Excited', 'Calm'],
        Mid: ['Tired', 'Bored', 'Consfused', 'Distracted'],
        Sad: ['Angry', 'Embarrassed', 'Let down', 'Sad'],
      },
    },
    { label: 'What happened today?', field: 'descrption', type: 'text' },
  ];