import React, { useState } from 'react';
import './MyRoutine.css';

const MyRoutine = ({ routine, onStartQuiz, onViewHistory }) => {
  const [activeTab, setActiveTab] = useState('skincare');
  // Show quiz prompt if no routine exists
  if (!routine) {
    return (
      <div className="routine-container">
        <div className="routine-header">
          <div className="routine-card">
            <h1>Create Your Personalized Plan</h1>
            <p>
              Take our comprehensive skincare quiz to get a personalized routine tailored to your
              skin type, concerns, and lifestyle. Our AI will analyze your answers to create the
              perfect skincare and dietary plan for you.
            </p>
            <button className="summary-button" onClick={onStartQuiz}>
              Take Skincare Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="routine-container">
      <div className="routine-header">
        <div className="routine-card">
          <h1>Your Personalized Plan</h1>
          <p>
            {routine.summary || "Welcome to your new skincare journey! Based on your profile, we've crafted a routine focused on your specific needs. Consistency is key to achieving radiant, healthy skin."}
          </p>
          <button
            className="summary-button"
            onClick={onViewHistory}
          >
            View Summary Report
          </button>
        </div>
      </div>

      <div className="routine-tabs">
        <button
          className={`tab-button ${activeTab === 'skincare' ? 'active' : ''}`}
          onClick={() => setActiveTab('skincare')}
        >
          Skincare Routine
        </button>
        <button
          className={`tab-button ${activeTab === 'dietary' ? 'active' : ''}`}
          onClick={() => setActiveTab('dietary')}
        >
          Dietary Advice
        </button>
      </div>

      {activeTab === 'skincare' && (
        <>
          <div className="routine-section">
            <h2>Morning Routine</h2>
            <div className="routine-steps">
              {routine.morningRoutine?.map((step, index) => (
                <div key={index} className="step-card">
                  <div className="step-image-placeholder"></div>
                  <div className="step-content">
                    <h3>Step {index + 1}: {step.type}</h3>
                    <p className="step-product">{step.product}</p>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="routine-section">
            <h2>Evening Routine</h2>
            <div className="routine-steps">
              {routine.eveningRoutine?.map((step, index) => (
                <div key={index} className="step-card">
                  <div className="step-image-placeholder"></div>
                  <div className="step-content">
                    <h3>Step {index + 1}: {step.type}</h3>
                    <p className="step-product">{step.product}</p>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'dietary' && (
        <div className="routine-section">
          <h2>Dietary Recommendations</h2>
          <div className="dietary-content">
            <div className="dietary-overview">
              <h3>{routine.dietaryPlan?.title || "Skin-Healthy Diet Plan"}</h3>
              <p>{routine.dietaryPlan?.description || "Foods and nutrients to support your skin health goals."}</p>
            </div>

            <div className="foods-grid">
              <h4>Recommended Foods</h4>
              <div className="foods-list">
                {routine.dietaryPlan?.foods?.map((food, index) => (
                  <div key={index} className="food-card">
                    <h5>{food.name}</h5>
                    <p>{food.benefit}</p>
                  </div>
                )) || (
                    <div className="food-card">
                      <h5>Take the quiz</h5>
                      <p>Complete your skincare quiz to get personalized dietary recommendations</p>
                    </div>
                  )}
              </div>
            </div>

            <div className="dietary-tips">
              <h4>Tips for Your Skin Type</h4>
              <div className="tips-grid">
                {routine.dietaryPlan?.tips?.map((tip, index) => (
                  <div key={index} className="tip-card">
                    <h5>{tip.title}</h5>
                    <p>{tip.description}</p>
                  </div>
                )) || (
                    <>
                      <div className="tip-card">
                        <h5>Stay Hydrated</h5>
                        <p>Drink 8-10 glasses of water daily for optimal skin hydration</p>
                      </div>
                      <div className="tip-card">
                        <h5>Eat Antioxidants</h5>
                        <p>Include colorful fruits and vegetables for skin protection</p>
                      </div>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRoutine;