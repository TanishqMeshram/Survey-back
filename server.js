const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
app.use(express.json());
app.use(cors());

const additionalQuestions = {
  Technology: [
    {
      label: 'Favorite Programming Language',
      type: 'select',
      options: [
        { value: '', text: 'Select language' },
        { value: 'JavaScript', text: 'JavaScript' },
        { value: 'Python', text: 'Python' },
        { value: 'Java', text: 'Java' },
        { value: 'C#', text: 'C#' },
      ],
      required: true,
      name: 'favoriteProgrammingLanguage',
    },
    { label: 'Years of Experience', type: 'number', required: true, name: 'yearsOfExperience' },
  ],
  Health: [
    {
      label: 'Exercise Frequency',
      type: 'select',
      options: [
        { value: '', text: 'Select frequency' },
        { value: 'Daily', text: 'Daily' },
        { value: 'Weekly', text: 'Weekly' },
        { value: 'Monthly', text: 'Monthly' },
        { value: 'Rarely', text: 'Rarely' },
      ],
      required: true,
      name: 'exerciseFrequency',
    },
    {
      label: 'Diet Preference',
      type: 'select',
      options: [
        { value: '', text: 'Select preference' },
        { value: 'Vegetarian', text: 'Vegetarian' },
        { value: 'Vegan', text: 'Vegan' },
        { value: 'Non-Vegetarian', text: 'Non-Vegetarian' },
      ],
      required: true,
      name: 'dietPreference',
    },
  ],
  Education: [
    {
      label: 'Highest Qualification',
      type: 'select',
      options: [
        { value: '', text: 'Select qualification' },
        { value: 'High School', text: 'High School' },
        { value: 'Bachelor\'s', text: 'Bachelor\'s' },
        { value: 'Master\'s', text: 'Master\'s' },
        { value: 'PhD', text: 'PhD' },
      ],
      required: true,
      name: 'highestQualification',
    },
    { label: 'Field of Study', type: 'text', required: true, name: 'fieldOfStudy' },
  ],
};

app.use(cors({
  origin: 'https://level3-survey-form.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.get('/questions/:topic', (req, res) => {
  const { topic } = req.params;
  const questions = additionalQuestions[topic];

  if (questions) {
    res.json(questions);
  } else {
    res.status(404).json({ error: `Questions for topic '${topic}' not found` });
  }
});

app.post('/submit', async (req, res) => {
  const { formData, additionalQuestions } = req.body;
  try {
    if (!formData || !additionalQuestions) {
      return res.status(400).json({ error: 'Invalid form data' });
    }
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
