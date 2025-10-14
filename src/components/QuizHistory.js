import React, { useState, useEffect } from 'react';
import './QuizHistory.css';

const QuizHistory = ({ user, onViewRoutine }) => {
  const [quizHistory, setQuizHistory] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    // Load quiz history from localStorage
    const savedHistory = localStorage.getItem(`quizHistory_${user.id}`);
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, [user.id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSkinConcernsText = (concerns) => {
    if (Array.isArray(concerns)) {
      return concerns.join(', ');
    }
    return concerns || 'Not specified';
  };

  const handleViewSummary = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleUseRoutine = (quiz) => {
    // Set this quiz as the active routine
    localStorage.setItem('beautyAppRoutine', JSON.stringify(quiz.routine));
    onViewRoutine(quiz.routine);
  };

  if (selectedQuiz) {
    return (
      <div className="quiz-history-container">
        <div className="history-header">
          <button 
            className="back-button"
            onClick={() => setSelectedQuiz(null)}
          >
            ← Back to History
          </button>
          <h2>Quiz Summary Report</h2>
        </div>

        <div className="summary-report">
          <div className="report-header">
            <h3>Skincare Analysis Report</h3>
            <p className="report-date">Completed on {formatDate(selectedQuiz.completedAt)}</p>
          </div>

          <div className="report-section">
            <h4>Your Profile</h4>
            <div className="profile-grid">
              <div className="profile-item">
                <span className="label">Skin Type:</span>
                <span className="value">{selectedQuiz.answers.skinType || 'Not specified'}</span>
              </div>
              <div className="profile-item">
                <span className="label">Main Concerns:</span>
                <span className="value">{getSkinConcernsText(selectedQuiz.answers.skinConcerns)}</span>
              </div>
              <div className="profile-item">
                <span className="label">Experience Level:</span>
                <span className="value">{selectedQuiz.answers.makeupExperience || 'Not specified'}</span>
              </div>
              <div className="profile-item">
                <span className="label">Daily Routine Time:</span>
                <span className="value">{selectedQuiz.answers.dailyRoutine || 'Not specified'}</span>
              </div>
              <div className="profile-item">
                <span className="label">Budget Range:</span>
                <span className="value">{selectedQuiz.answers.budget || 'Not specified'}</span>
              </div>
            </div>
          </div>

          <div className="report-section">
            <h4>AI Analysis Summary</h4>
            <p className="analysis-text">
              {selectedQuiz.routine?.summary || "Based on your profile, we've created a personalized routine to address your specific skin needs and concerns."}
            </p>
          </div>

          <div className="report-section">
            <h4>Recommended Morning Routine</h4>
            <div className="routine-steps">
              {selectedQuiz.routine?.morningRoutine?.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-details">
                    <h5>{step.type}</h5>
                    <p className="product-name">{step.product}</p>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h4>Recommended Evening Routine</h4>
            <div className="routine-steps">
              {selectedQuiz.routine?.eveningRoutine?.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-details">
                    <h5>{step.type}</h5>
                    <p className="product-name">{step.product}</p>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedQuiz.recommendations && selectedQuiz.recommendations.length > 0 && (
            <div className="report-section">
              <h4>Product Recommendations</h4>
              <div className="products-summary">
                <p>Based on your quiz answers, here are the personalized product recommendations:</p>
                <div className="products-grid">
                  {selectedQuiz.recommendations.map((product, index) => (
                    <div key={index} className="product-summary-card">
                      <div className="product-category-badge">{product.category}</div>
                      <h6>{product.brand}</h6>
                      <p className="product-name">{product.product}</p>
                      <p className="product-description">{product.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="report-section">
            <h4>Dietary Recommendations</h4>
            <div className="dietary-summary">
              <h5>{selectedQuiz.routine?.dietaryPlan?.title || "Skin-Healthy Diet Plan"}</h5>
              <p>{selectedQuiz.routine?.dietaryPlan?.description || "Foods and nutrients to support your skin health goals."}</p>
              
              <div className="foods-summary">
                <h6>Recommended Foods:</h6>
                <ul>
                  {selectedQuiz.routine?.dietaryPlan?.foods?.map((food, index) => (
                    <li key={index}>
                      <strong>{food.name}:</strong> {food.benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="report-actions">
            <button 
              className="use-routine-button"
              onClick={() => handleUseRoutine(selectedQuiz)}
            >
              Use This Routine
            </button>
            <button 
              className="download-button"
              onClick={() => window.print()}
            >
              Download Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-history-container">
      <div className="history-header">
        <h2>Quiz History</h2>
        <p>View your past skincare assessments and recommendations</p>
      </div>

      {quizHistory.length === 0 ? (
        <div className="empty-history">
          <div className="empty-content">
            <h3>No Quiz History Yet</h3>
            <p>Take your first skincare quiz to see your personalized recommendations and track your progress over time.</p>
            <button 
              className="take-quiz-button"
              onClick={() => onViewRoutine(null)}
            >
              Take Your First Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="history-grid">
          {quizHistory.map((quiz, index) => (
            <div key={index} className="history-card">
              <div className="card-header">
                <h3>Quiz #{quizHistory.length - index}</h3>
                <span className="quiz-date">{formatDate(quiz.completedAt)}</span>
              </div>
              
              <div className="card-content">
                <div className="quiz-summary">
                  <p><strong>Skin Type:</strong> {quiz.answers.skinType}</p>
                  <p><strong>Main Concerns:</strong> {getSkinConcernsText(quiz.answers.skinConcerns)}</p>
                  <p><strong>Budget:</strong> {quiz.answers.budget}</p>
                </div>
              </div>
              
              <div className="card-actions">
                <button 
                  className="view-summary-button"
                  onClick={() => handleViewSummary(quiz)}
                >
                  View Summary
                </button>
                <button 
                  className="use-routine-button"
                  onClick={() => handleUseRoutine(quiz)}
                >
                  Use Routine
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizHistory;