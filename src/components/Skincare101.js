import React, { useState } from 'react';
import './Skincare101.css';

const Skincare101 = () => {
  const [activeSection, setActiveSection] = useState('skin-types');

  const skinTypes = [
    {
      id: 'normal',
      name: 'Normal Skin',
      icon: '✨',
      characteristics: [
        'Balanced oil production',
        'Small, barely visible pores',
        'Smooth, even texture',
        'Good blood circulation',
        'Fresh, rosy complexion'
      ],
      description: 'Normal skin is well-balanced, neither too oily nor too dry. It has a smooth texture, fine pores, and good blood circulation. This skin type is generally not prone to sensitivity and maintains a healthy, radiant appearance.',
      careRoutine: [
        'Gentle cleanser twice daily',
        'Light moisturizer morning and night',
        'SPF 30+ sunscreen daily',
        'Weekly exfoliation',
        'Hydrating serum as needed'
      ],
      commonIssues: [
        'Occasional breakouts during hormonal changes',
        'Seasonal dryness or oiliness',
        'Minor sensitivity to new products'
      ],
      recommendedIngredients: [
        'Hyaluronic Acid for hydration',
        'Vitamin C for antioxidant protection',
        'Niacinamide for pore refinement',
        'Gentle AHAs for exfoliation'
      ]
    },
    {
      id: 'oily',
      name: 'Oily Skin',
      icon: '💧',
      characteristics: [
        'Excess sebum production',
        'Enlarged, visible pores',
        'Shiny, greasy appearance',
        'Prone to blackheads and acne',
        'Thick, coarse texture'
      ],
      description: 'Oily skin produces excess sebum, leading to a shiny appearance and enlarged pores. While it can be prone to acne and blackheads, oily skin tends to age more slowly due to natural moisture retention.',
      careRoutine: [
        'Foaming or gel cleanser twice daily',
        'Oil-free, lightweight moisturizer',
        'Non-comedogenic SPF daily',
        'BHA exfoliation 2-3 times weekly',
        'Clay mask weekly'
      ],
      commonIssues: [
        'Frequent breakouts and acne',
        'Blackheads and whiteheads',
        'Enlarged pores',
        'Shiny T-zone throughout the day'
      ],
      recommendedIngredients: [
        'Salicylic Acid (BHA) for pore cleansing',
        'Niacinamide to control oil production',
        'Clay and charcoal for deep cleansing',
        'Zinc for anti-inflammatory benefits'
      ]
    },
    {
      id: 'dry',
      name: 'Dry Skin',
      icon: '🏜️',
      characteristics: [
        'Low sebum production',
        'Tight, uncomfortable feeling',
        'Flaky or rough texture',
        'Fine lines more visible',
        'Dull, lackluster appearance'
      ],
      description: 'Dry skin lacks sufficient natural oils and moisture, resulting in a tight, sometimes flaky appearance. It may feel uncomfortable and show signs of aging earlier due to reduced elasticity.',
      careRoutine: [
        'Cream or oil-based cleanser',
        'Rich, emollient moisturizer',
        'Moisturizing SPF daily',
        'Gentle exfoliation weekly',
        'Hydrating face oils or serums'
      ],
      commonIssues: [
        'Persistent flakiness and peeling',
        'Premature fine lines',
        'Sensitivity to weather changes',
        'Irritation from harsh products'
      ],
      recommendedIngredients: [
        'Ceramides for barrier repair',
        'Hyaluronic Acid for deep hydration',
        'Glycerin for moisture retention',
        'Natural oils (jojoba, argan) for nourishment'
      ]
    },
    {
      id: 'combination',
      name: 'Combination Skin',
      icon: '🎭',
      characteristics: [
        'Oily T-zone (forehead, nose, chin)',
        'Normal to dry cheeks',
        'Mixed pore sizes',
        'Varying texture across face',
        'Different needs in different areas'
      ],
      description: 'Combination skin features both oily and dry areas, typically with an oily T-zone and normal to dry cheeks. This skin type requires a balanced approach to address different needs across the face.',
      careRoutine: [
        'Gentle, balanced cleanser',
        'Lightweight moisturizer on T-zone',
        'Richer moisturizer on dry areas',
        'Targeted treatments for different zones',
        'Multi-masking approach'
      ],
      commonIssues: [
        'Breakouts in T-zone',
        'Dryness on cheeks',
        'Difficulty finding suitable products',
        'Seasonal changes affecting balance'
      ],
      recommendedIngredients: [
        'Niacinamide for oil control in T-zone',
        'Hyaluronic Acid for overall hydration',
        'Gentle BHA for T-zone exfoliation',
        'Ceramides for dry area support'
      ]
    },
    {
      id: 'sensitive',
      name: 'Sensitive Skin',
      icon: '🌸',
      characteristics: [
        'Easily irritated by products',
        'Redness and inflammation',
        'Burning or stinging sensations',
        'Reactive to environmental factors',
        'Thin, delicate appearance'
      ],
      description: 'Sensitive skin reacts easily to skincare products, environmental factors, and stress. It may experience redness, irritation, or burning sensations and requires gentle, fragrance-free formulations.',
      careRoutine: [
        'Gentle, fragrance-free cleanser',
        'Hypoallergenic moisturizer',
        'Mineral sunscreen (zinc oxide)',
        'Minimal product routine',
        'Patch test all new products'
      ],
      commonIssues: [
        'Frequent redness and irritation',
        'Reactions to fragrances and dyes',
        'Sensitivity to weather changes',
        'Difficulty finding suitable products'
      ],
      recommendedIngredients: [
        'Aloe Vera for soothing relief',
        'Chamomile for anti-inflammatory benefits',
        'Ceramides for barrier protection',
        'Avoid: fragrances, alcohol, harsh acids'
      ]
    },
    {
      id: 'mature',
      name: 'Mature Skin',
      icon: '👑',
      characteristics: [
        'Reduced collagen and elastin',
        'Fine lines and wrinkles',
        'Loss of firmness and elasticity',
        'Uneven skin tone',
        'Slower cell turnover'
      ],
      description: 'Mature skin shows signs of aging including fine lines, wrinkles, and loss of elasticity. It benefits from anti-aging ingredients that boost collagen production and improve skin texture.',
      careRoutine: [
        'Gentle, hydrating cleanser',
        'Anti-aging serum with actives',
        'Rich, nourishing moisturizer',
        'High SPF sunscreen daily',
        'Regular professional treatments'
      ],
      commonIssues: [
        'Visible fine lines and wrinkles',
        'Age spots and hyperpigmentation',
        'Loss of skin firmness',
        'Increased dryness'
      ],
      recommendedIngredients: [
        'Retinol for cell turnover',
        'Vitamin C for collagen support',
        'Peptides for firming',
        'AHAs for gentle exfoliation'
      ]
    }
  ];

  const skinCareBasics = [
    {
      title: 'Daily Cleansing',
      description: 'Remove dirt, oil, and impurities with a gentle cleanser suited to your skin type.',
      tips: ['Cleanse twice daily', 'Use lukewarm water', 'Pat dry gently', 'Avoid over-cleansing']
    },
    {
      title: 'Moisturizing',
      description: 'Maintain skin hydration and barrier function with appropriate moisturizers.',
      tips: ['Apply to damp skin', 'Choose based on skin type', 'Don\'t skip if oily', 'Reapply as needed']
    },
    {
      title: 'Sun Protection',
      description: 'Protect against UV damage with broad-spectrum SPF 30 or higher daily.',
      tips: ['Apply 15 minutes before sun exposure', 'Reapply every 2 hours', 'Use year-round', 'Don\'t forget neck and ears']
    },
    {
      title: 'Exfoliation',
      description: 'Remove dead skin cells to reveal smoother, brighter skin underneath.',
      tips: ['Start slowly', 'Choose chemical over physical', 'Follow with moisturizer', 'Increase sun protection']
    }
  ];

  return (
    <div className="skincare101-container">
      <div className="skincare101-header">
        <h1>📚 Skincare 101</h1>
        <p>Your complete guide to understanding skin types and building the perfect routine</p>
      </div>

      <div className="skincare101-navigation">
        <button 
          className={`nav-tab ${activeSection === 'skin-types' ? 'active' : ''}`}
          onClick={() => setActiveSection('skin-types')}
        >
          🔍 Skin Types
        </button>
        <button 
          className={`nav-tab ${activeSection === 'basics' ? 'active' : ''}`}
          onClick={() => setActiveSection('basics')}
        >
          📖 Skincare Basics
        </button>
      </div>

      <div className="skincare101-content">
        {activeSection === 'skin-types' && (
          <div className="skin-types-section">
            <div className="section-intro">
              <h2>Understanding Your Skin Type</h2>
              <p>Identifying your skin type is the first step to building an effective skincare routine. Each skin type has unique characteristics and requires specific care approaches.</p>
            </div>

            <div className="skin-types-grid">
              {skinTypes.map((skinType) => (
                <div key={skinType.id} className="skin-type-card">
                  <div className="skin-type-header">
                    <span className="skin-type-icon">{skinType.icon}</span>
                    <h3>{skinType.name}</h3>
                  </div>

                  <div className="skin-type-content">
                    <p className="skin-type-description">{skinType.description}</p>

                    <div className="characteristics-section">
                      <h4>Key Characteristics:</h4>
                      <ul className="characteristics-list">
                        {skinType.characteristics.map((char, index) => (
                          <li key={index}>{char}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="care-routine-section">
                      <h4>Recommended Care Routine:</h4>
                      <ul className="care-routine-list">
                        {skinType.careRoutine.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="ingredients-section">
                      <h4>Beneficial Ingredients:</h4>
                      <ul className="ingredients-list">
                        {skinType.recommendedIngredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="issues-section">
                      <h4>Common Concerns:</h4>
                      <ul className="issues-list">
                        {skinType.commonIssues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'basics' && (
          <div className="basics-section">
            <div className="section-intro">
              <h2>Skincare Fundamentals</h2>
              <p>Master these essential skincare practices for healthy, radiant skin regardless of your skin type.</p>
            </div>

            <div className="basics-grid">
              {skinCareBasics.map((basic, index) => (
                <div key={index} className="basic-card">
                  <h3>{basic.title}</h3>
                  <p>{basic.description}</p>
                  <div className="tips-section">
                    <h4>Pro Tips:</h4>
                    <ul>
                      {basic.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="additional-tips">
              <h3>🌟 Additional Skincare Tips</h3>
              <div className="tips-grid">
                <div className="tip-item">
                  <h4>💧 Stay Hydrated</h4>
                  <p>Drink plenty of water throughout the day to maintain skin hydration from within.</p>
                </div>
                <div className="tip-item">
                  <h4>😴 Get Quality Sleep</h4>
                  <p>Aim for 7-9 hours of sleep to allow your skin to repair and regenerate overnight.</p>
                </div>
                <div className="tip-item">
                  <h4>🥗 Eat a Balanced Diet</h4>
                  <p>Include antioxidant-rich foods, healthy fats, and vitamins for glowing skin.</p>
                </div>
                <div className="tip-item">
                  <h4>🧘 Manage Stress</h4>
                  <p>Practice stress-reduction techniques as stress can trigger skin issues.</p>
                </div>
                <div className="tip-item">
                  <h4>🚫 Avoid Touching Your Face</h4>
                  <p>Keep hands away from your face to prevent transferring bacteria and oils.</p>
                </div>
                <div className="tip-item">
                  <h4>🧴 Patch Test New Products</h4>
                  <p>Always test new skincare products on a small area before full application.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skincare101;