import React, { useState } from 'react';
import './DietaryPlan.css';

const DietaryPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState('glow');

  const dietaryPlans = {
    glow: {
      title: "Glow Boost Plan",
      description: "Foods rich in antioxidants and vitamins for radiant skin",
      duration: "4 weeks",
      benefits: ["Improved skin radiance", "Reduced inflammation", "Better hydration"],
      foods: [
        { name: "Blueberries", benefit: "Rich in antioxidants" },
        { name: "Salmon", benefit: "Omega-3 fatty acids" },
        { name: "Avocado", benefit: "Healthy fats & Vitamin E" },
        { name: "Sweet Potatoes", benefit: "Beta-carotene" },
        { name: "Green Tea", benefit: "Polyphenols" },
        { name: "Walnuts", benefit: "Zinc & Vitamin E" }
      ]
    },
    acne: {
      title: "Clear Skin Plan",
      description: "Anti-inflammatory foods to help reduce acne and breakouts",
      duration: "6 weeks",
      benefits: ["Reduced breakouts", "Less inflammation", "Balanced hormones"],
      foods: [
        { name: "Leafy Greens", benefit: "Vitamins A & C" },
        { name: "Turmeric", benefit: "Anti-inflammatory" },
        { name: "Probiotics", benefit: "Gut health" },
        { name: "Green Tea", benefit: "Antioxidants" },
        { name: "Zinc-rich foods", benefit: "Healing properties" },
        { name: "Low-glycemic fruits", benefit: "Stable blood sugar" }
      ]
    },
    antiaging: {
      title: "Youth Renewal Plan",
      description: "Collagen-boosting foods for youthful, firm skin",
      duration: "8 weeks",
      benefits: ["Increased collagen", "Reduced fine lines", "Improved elasticity"],
      foods: [
        { name: "Bone Broth", benefit: "Collagen protein" },
        { name: "Citrus Fruits", benefit: "Vitamin C" },
        { name: "Dark Berries", benefit: "Anthocyanins" },
        { name: "Tomatoes", benefit: "Lycopene" },
        { name: "Dark Chocolate", benefit: "Flavonoids" },
        { name: "Red Bell Peppers", benefit: "Vitamin C" }
      ]
    }
  };

  const currentPlan = dietaryPlans[selectedPlan];

  return (
    <div className="dietary-plan-container">
      <div className="dietary-header">
        <h2>Personalized Dietary Plans</h2>
        <p>Nourish your skin from within with targeted nutrition plans</p>
      </div>

      <div className="plan-selector">
        {Object.entries(dietaryPlans).map(([key, plan]) => (
          <button
            key={key}
            className={`plan-tab ${selectedPlan === key ? 'active' : ''}`}
            onClick={() => setSelectedPlan(key)}
          >
            {plan.title}
          </button>
        ))}
      </div>

      <div className="plan-content">
        <div className="plan-overview">
          <div className="plan-info">
            <h3>{currentPlan.title}</h3>
            <p className="plan-description">{currentPlan.description}</p>
            <div className="plan-duration">
              <span className="duration-badge">{currentPlan.duration}</span>
            </div>
          </div>

          <div className="plan-benefits">
            <h4>Expected Benefits</h4>
            <ul>
              {currentPlan.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foods-grid">
          <h4>Recommended Foods</h4>
          <div className="foods-list">
            {currentPlan.foods.map((food, index) => (
              <div key={index} className="food-card">
                <h5>{food.name}</h5>
                <p>{food.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="plan-actions">
          <button className="start-plan-button">
            Start This Plan
          </button>
          <button className="download-button">
            Download Meal Guide
          </button>
        </div>
      </div>

      <div className="dietary-tips">
        <h4>General Tips</h4>
        <div className="tips-grid">
          <div className="tip-card">
            <h5>Stay Hydrated</h5>
            <p>Drink 8-10 glasses of water daily for optimal skin hydration</p>
          </div>
          <div className="tip-card">
            <h5>Limit Sugar</h5>
            <p>Reduce processed sugars to prevent inflammation and breakouts</p>
          </div>
          <div className="tip-card">
            <h5>Eat the Rainbow</h5>
            <p>Include colorful fruits and vegetables for diverse nutrients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietaryPlan;