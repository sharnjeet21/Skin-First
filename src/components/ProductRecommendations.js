import React from 'react';
import './ProductRecommendations.css';

const ProductRecommendations = ({ recommendations, onReset, onViewRoutine }) => {
  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h2>🎉 Your Personalized Beauty Recommendations</h2>
        <p>Based on your quiz answers, here are the perfect products for you:</p>
      </div>

      <div className="products-grid">
        {recommendations.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-category">{product.category}</div>
            <h3 className="product-brand">{product.brand}</h3>
            <h4 className="product-name">{product.product}</h4>
            <p className="product-description">{product.description}</p>
            <div className="product-actions">
              <button className="search-button">
                Search Online
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="recommendations-footer">
        <div className="action-buttons">
          <button className="view-routine-button" onClick={onViewRoutine}>
            View My Routine
          </button>
          <button className="retake-button" onClick={onReset}>
            Take Quiz Again
          </button>
        </div>
        <p className="disclaimer">
          * These are AI-generated recommendations based on your preferences. 
          Always patch test new products and consult with professionals for specific skin concerns.
        </p>
      </div>
    </div>
  );
};

export default ProductRecommendations;