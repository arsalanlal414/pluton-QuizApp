import React, { useState } from 'react';
import axios from 'axios';
import './createQuiz.scss';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, title: '', options: { A: '', B: '', C: '', D: '' }, answer: '' },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    const newQuestionId = questions.length + 1;
    const newQuestion = { id: newQuestionId, title: '', options: { A: '', B: '', C: '', D: '' }, answer: '' };
    setQuestions([...questions, newQuestion]);
  };

  const handleCreateQuiz = async () => {
    try {
      const newQuiz = {
        title,
        description,
        subject,
        questions,
      };

      const response = await axios.post('http://localhost:5001/api/quizzes', newQuiz); // Replace with your API endpoint
      console.log('Quiz created:', response.data);
      // You can handle success and redirection to the quiz list or other actions here
    } catch (error) {
      console.error('Error creating quiz:', error);
      // You can handle error display or other actions here
    }
  };

  return (
    <div className="create-quiz-form">
      <h2>Create a New Quiz</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <h3>Questions:</h3>
      {questions.map((question, index) => (
        <div key={question.id} className="question">
          <input
            type="text"
            placeholder={`Question ${index + 1}`}
            value={question.title}
            onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
          />
          <input
            type="text"
            placeholder="Option A"
            value={question.options.A}
            onChange={(e) => handleQuestionChange(index, 'options', { ...question.options, A: e.target.value })}
          />
          <input
            type="text"
            placeholder="Option B"
            value={question.options.B}
            onChange={(e) => handleQuestionChange(index, 'options', { ...question.options, B: e.target.value })}
          />
          <input
            type="text"
            placeholder="Option C"
            value={question.options.C}
            onChange={(e) => handleQuestionChange(index, 'options', { ...question.options, C: e.target.value })}
          />
          <input
            type="text"
            placeholder="Option D"
            value={question.options.D}
            onChange={(e) => handleQuestionChange(index, 'options', { ...question.options, D: e.target.value })}
          />
          <input
            type="text"
            placeholder="Answer"
            value={question.answer}
            onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
          />
        </div>
      ))}
      <div className='quiz-btn'>
        <button onClick={addQuestion}>Add Question</button>
        <button onClick={handleCreateQuiz}>Create Quiz</button>
      </div>
    </div>
  );
}

export default CreateQuiz;
