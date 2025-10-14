import React, { useState } from 'react';
import './BeautyQuiz.css';

const BeautyQuiz = ({ onComplete, loading }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const questions = [
    {
      id: 'skinType',
      question: 'What is your skin type?',
      subtitle: 'This helps us understand your basic skin needs.',
      options: ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal']
    },
    {
      id: 'skinConcerns',
      question: 'What are your main skin concerns?',
      subtitle: 'Select up to 3. This helps us target your specific issues.',
      options: ['Acne & Blemishes', 'Redness & Rosacea', 'Dark Spots & Hyperpigmentation', 'Fine Lines & Wrinkles', 'Enlarged Pores', 'Dullness & Uneven Texture'],
      multiSelect: true,
      maxSelections: 3
    },
    {
      id: 'makeupExperience',
      question: 'How would you describe your makeup experience?',
      subtitle: 'This helps us recommend products at the right level.',
      options: ['Beginner', 'Intermediate', 'Advanced', 'Professional']
    },
    {
      id: 'dailyRoutine',
      question: 'How much time do you spend on your daily beauty routine?',
      subtitle: 'We\'ll tailor recommendations to fit your schedule.',
      options: ['5-10 minutes', '15-30 minutes', '30-60 minutes', 'Over 1 hour']
    },
    {
      id: 'budget',
      question: 'What is your preferred budget range for beauty products?',
      subtitle: 'We\'ll find options that work within your budget.',
      options: ['Under $25', '$25-$50', '$50-$100', 'Over $100']
    }
  ];

  const handleAnswer = (answer) => {
    const currentQ = questions[currentQuestion];
    
    if (currentQ.multiSelect) {
      // Handle multi-select questions
      let newSelected = [...selectedOptions];
      
      if (newSelected.includes(answer)) {
        newSelected = newSelected.filter(item => item !== answer);
      } else if (newSelected.length < (currentQ.maxSelections || 3)) {
        newSelected.push(answer);
      }
      
      setSelectedOptions(newSelected);
      
      // Update answers with current selections
      const newAnswers = { ...answers, [currentQ.id]: newSelected };
      setAnswers(newAnswers);
    } else {
      // Handle single-select questions
      const newAnswers = { ...answers, [currentQ.id]: answer };
      setAnswers(newAnswers);
      
      // Auto-advance for single-select
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOptions([]);
      } else {
        onComplete(newAnswers);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOptions([]);
    } else {
      onComplete(answers);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Load previous selections for multi-select questions
      const prevQ = questions[currentQuestion - 1];
      if (prevQ.multiSelect && answers[prevQ.id]) {
        setSelectedOptions(answers[prevQ.id]);
      } else {
        setSelectedOptions([]);
      }
    }
  };

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading">
          <div className="spinner"></div>
          <h2>Generating your personalized recommendations...</h2>
          <p>Our AI is analyzing your answers to find the perfect products for you!</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const currentQ = questions[currentQuestion];
  const canProceed = currentQ.multiSelect ? selectedOptions.length > 0 : true;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="step-indicator">
          STEP {currentQuestion + 1} OF {questions.length}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="question-content">
        <h1>{currentQ.question}</h1>
        <p className="question-subtitle">{currentQ.subtitle}</p>
        
        <div className="options-grid">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                currentQ.multiSelect 
                  ? (selectedOptions.includes(option) ? 'selected' : '')
                  : ''
              }`}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="quiz-navigation">
          <button 
            className="nav-button back-button" 
            onClick={goBack}
            disabled={currentQuestion === 0}
          >
            Back
          </button>
          
          {currentQ.multiSelect && (
            <button 
              className="nav-button next-button" 
              onClick={handleNext}
              disabled={!canProceed}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeautyQuiz;