import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import BeautyQuiz from './components/BeautyQuiz';
import ProductRecommendations from './components/ProductRecommendations';
import MyRoutine from './components/MyRoutine';
import QuizHistory from './components/QuizHistory';
import Reminders from './components/Reminders';
import FindDermatologist from './components/FindDermatologist';
import {
  ProductsPage,
  TrendsPage,
  FavoritesPage
} from './components/PlaceholderPages';
import Profile from './components/Profile';
import Skincare101 from './components/Skincare101';
// API imports will be added when needed

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('routine');
  const [recommendations, setRecommendations] = useState(null);
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuizAnswers, setCurrentQuizAnswers] = useState(null);

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('beautyAppUser');
    const savedToken = localStorage.getItem('beautyAppToken');
    const savedRoutine = localStorage.getItem('beautyAppRoutine');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }

    if (savedRoutine) {
      setRoutine(JSON.parse(savedRoutine));
    }
  }, []);

  // Save to history when both recommendations and routine are ready
  useEffect(() => {
    if (currentQuizAnswers && recommendations && routine) {
      saveQuizToHistory(currentQuizAnswers, routine, recommendations);
      setCurrentQuizAnswers(null); // Clear to prevent duplicate saves
    }
  }, [currentQuizAnswers, recommendations, routine, user]);

  const handleQuizComplete = (quizAnswers) => {
    setLoading(true);
    setCurrentQuizAnswers(quizAnswers);
    generateRecommendations(quizAnswers);
    generateRoutine(quizAnswers);
  };

  const generateRecommendations = async (answers) => {
    try {
      console.log('Starting recommendation generation...');
      console.log('API Key exists:', !!process.env.REACT_APP_GEMINI_API_KEY);

      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `You are a beauty expert. Based on the quiz answers below, recommend exactly 5 beauty products. 

IMPORTANT: Respond ONLY with a valid JSON array. No other text before or after.

Quiz Answers:
${Object.entries(answers).map(([key, value]) => `${key}: ${value}`).join('\n')}

Format your response as a JSON array with this exact structure:
[
  {
    "brand": "Brand Name",
    "product": "Product Name", 
    "description": "Brief description explaining why this product suits their needs",
    "category": "Skincare/Makeup/Haircare"
  }
]

Provide 5 realistic products that match their skin type, concerns, budget, and preferences.`;

      console.log('Sending request to Gemini...');
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      console.log('Received response:', text);

      // Clean the response text
      let cleanText = text.trim();

      // Remove any markdown code blocks
      cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

      // Extract JSON from the response
      const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          const products = JSON.parse(jsonMatch[0]);
          console.log('Parsed products:', products);
          setRecommendations(products);
        } catch (parseError) {
          console.error('JSON parsing error:', parseError);
          throw new Error('Failed to parse AI response');
        }
      } else {
        console.log('No JSON found, using fallback');
        // Create fallback recommendations based on answers
        const fallbackProducts = createFallbackRecommendations(answers);
        setRecommendations(fallbackProducts);
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);

      // Create fallback recommendations
      const fallbackProducts = createFallbackRecommendations(answers);
      setRecommendations(fallbackProducts);
    } finally {
      setLoading(false);
      // Results will stay on screen until user manually closes them
    }
  };

  const generateRoutine = async (answers) => {
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `You are a skincare expert. Based on the quiz answers below, create a personalized skincare routine and dietary plan.

IMPORTANT: Respond ONLY with a valid JSON object. No other text before or after.

Quiz Answers:
${Object.entries(answers).map(([key, value]) => `${key}: ${value}`).join('\n')}

Format your response as a JSON object with this exact structure:
{
  "summary": "Brief personalized summary of their skin needs and routine focus",
  "morningRoutine": [
    {
      "type": "Cleanser/Serum/Moisturizer/Sunscreen",
      "product": "Specific product recommendation",
      "description": "Why this product suits their needs"
    }
  ],
  "eveningRoutine": [
    {
      "type": "Cleanser/Treatment/Moisturizer",
      "product": "Specific product recommendation", 
      "description": "Why this product suits their needs"
    }
  ],
  "dietaryPlan": {
    "title": "Diet plan name based on their skin goals",
    "description": "Brief description of the dietary approach",
    "foods": [
      {
        "name": "Food name",
        "benefit": "How it helps their skin"
      }
    ],
    "tips": [
      {
        "title": "Tip title",
        "description": "Specific advice for their skin type"
      }
    ]
  }
}

Create a routine with 3-4 morning steps and 3-4 evening steps. Include 5-6 food recommendations and 3-4 tips.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      let cleanText = text.trim();
      cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const routineData = JSON.parse(jsonMatch[0]);
          setRoutine(routineData);
          localStorage.setItem('beautyAppRoutine', JSON.stringify(routineData));
        } catch (parseError) {
          console.error('Routine JSON parsing error:', parseError);
          const fallbackRoutine = createFallbackRoutine(answers);
          setRoutine(fallbackRoutine);
        }
      } else {
        const fallbackRoutine = createFallbackRoutine(answers);
        setRoutine(fallbackRoutine);
      }
    } catch (error) {
      console.error('Error generating routine:', error);
      const fallbackRoutine = createFallbackRoutine(answers);
      setRoutine(fallbackRoutine);
    }
  };

  const saveQuizToHistory = (answers, routineData, recommendationsData) => {
    if (!user) return;

    const quizEntry = {
      id: Date.now().toString(),
      answers,
      routine: routineData,
      recommendations: recommendationsData || [],
      completedAt: new Date().toISOString(),
      userId: user.id
    };

    // Get existing history
    const existingHistory = JSON.parse(localStorage.getItem(`quizHistory_${user.id}`) || '[]');

    // Add new entry to the beginning
    existingHistory.unshift(quizEntry);

    // Keep only last 10 entries
    const limitedHistory = existingHistory.slice(0, 10);

    // Save back to localStorage
    localStorage.setItem(`quizHistory_${user.id}`, JSON.stringify(limitedHistory));
  };

  const createFallbackRoutine = (answers) => {
    const skinType = answers.skinType || 'Normal';

    return {
      summary: `Based on your ${skinType.toLowerCase()} skin type, we've created a gentle routine focused on maintaining healthy skin balance and addressing your specific concerns.`,
      morningRoutine: [
        {
          type: "Cleanser",
          product: `CeraVe ${skinType} Skin Cleanser`,
          description: `Gentle cleanser perfect for ${skinType.toLowerCase()} skin, removes impurities without stripping natural oils.`
        },
        {
          type: "Serum",
          product: "The Ordinary Hyaluronic Acid 2% + B5",
          description: "Hydrating serum that plumps skin and provides long-lasting moisture."
        },
        {
          type: "Moisturizer",
          product: "Neutrogena Hydro Boost",
          description: "Lightweight gel moisturizer with hyaluronic acid for all-day hydration."
        },
        {
          type: "Sunscreen",
          product: "EltaMD UV Clear SPF 46",
          description: "Broad-spectrum protection that won't clog pores or leave white residue."
        }
      ],
      eveningRoutine: [
        {
          type: "Cleanser",
          product: `CeraVe ${skinType} Skin Cleanser`,
          description: "Same gentle cleanser to remove makeup and daily buildup."
        },
        {
          type: "Treatment",
          product: "The Ordinary Niacinamide 10% + Zinc 1%",
          description: "Reduces appearance of blemishes and regulates oil production."
        },
        {
          type: "Moisturizer",
          product: "Olay Regenerist Night Recovery Cream",
          description: "Rich night cream that repairs and regenerates skin overnight."
        }
      ],
      dietaryPlan: {
        title: "Glow-Boosting Diet Plan",
        description: "Foods rich in antioxidants and nutrients to support healthy, radiant skin.",
        foods: [
          { name: "Blueberries", benefit: "Rich in antioxidants that protect against free radical damage" },
          { name: "Salmon", benefit: "Omega-3 fatty acids reduce inflammation and support skin barrier" },
          { name: "Avocado", benefit: "Healthy fats and Vitamin E for skin moisture and protection" },
          { name: "Sweet Potatoes", benefit: "Beta-carotene converts to Vitamin A for skin cell renewal" },
          { name: "Green Tea", benefit: "Polyphenols provide anti-inflammatory benefits" },
          { name: "Walnuts", benefit: "Zinc and Vitamin E support skin healing and protection" }
        ],
        tips: [
          { title: "Stay Hydrated", description: "Drink 8-10 glasses of water daily for optimal skin hydration" },
          { title: "Limit Sugar", description: "Reduce processed sugars to prevent inflammation and breakouts" },
          { title: "Eat the Rainbow", description: "Include colorful fruits and vegetables for diverse nutrients" },
          { title: "Healthy Fats", description: "Include omega-3 rich foods to support your skin barrier function" }
        ]
      }
    };
  };

  const createFallbackRecommendations = (answers) => {
    const skinType = answers.skinType || 'Normal';
    const budget = answers.budget || 'Under $25';

    return [
      {
        brand: "CeraVe",
        product: `${skinType} Skin Cleanser`,
        description: `Perfect gentle cleanser for ${skinType.toLowerCase()} skin type, suitable for daily use.`,
        category: "Skincare"
      },
      {
        brand: "The Ordinary",
        product: "Niacinamide 10% + Zinc 1%",
        description: "Helps reduce appearance of blemishes and congestion, great for most skin types.",
        category: "Skincare"
      },
      {
        brand: "Maybelline",
        product: "Fit Me Foundation",
        description: `Affordable foundation option within your ${budget} budget range.`,
        category: "Makeup"
      },
      {
        brand: "Neutrogena",
        product: "Hydrating Moisturizer",
        description: "Lightweight daily moisturizer suitable for your skincare routine.",
        category: "Skincare"
      },
      {
        brand: "L'Oréal",
        product: "Mascara Voluminous",
        description: "Classic mascara for everyday wear, beginner-friendly application.",
        category: "Makeup"
      }
    ];
  };

  const resetQuiz = () => {
    setRecommendations(null);
    setRoutine(null);
    localStorage.removeItem('beautyAppRoutine');
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('beautyAppUser');
    localStorage.removeItem('beautyAppToken');
    localStorage.removeItem('beautyAppRoutine');
    setUser(null);
    setCurrentPage('routine');
    setRecommendations(null);
    setRoutine(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === 'quiz') {
      setRecommendations(null);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'routine':
        return <MyRoutine
          routine={routine}
          onStartQuiz={() => setCurrentPage('quiz-questions')}
          onViewHistory={() => setCurrentPage('history')}
        />;
      case 'quiz-questions':
        return !recommendations ? (
          <BeautyQuiz onComplete={handleQuizComplete} loading={loading} />
        ) : (
          <ProductRecommendations
            recommendations={recommendations}
            onReset={resetQuiz}
            onViewRoutine={() => setCurrentPage('routine')}
          />
        );
      case 'dermatologist':
        return <FindDermatologist />;
      case 'reminders':
        return <Reminders user={user} />;
      case 'skincare101':
        return <Skincare101 />;
      case 'profile':
        return <Profile user={user} onUpdateUser={handleUpdateUser} />;
      case 'history':
        return <QuizHistory user={user} onViewRoutine={(routineData) => {
          if (routineData) {
            setRoutine(routineData);
            setCurrentPage('routine');
          } else {
            setCurrentPage('quiz-questions');
          }
        }} />;
      case 'favorites':
        return <FavoritesPage />;
      case 'settings':
        return <Profile user={user} onUpdateUser={handleUpdateUser} />;
      case 'quiz':
        return <div className="main-content">
          <div className="content-card">
            <h1>Discover Your Perfect Skincare Routine</h1>
            <p>Answer a few simple questions about your skin, and our AI-powered expert will curate a personalized routine just for you.</p>
            <button
              className="start-quiz-button"
              onClick={() => setCurrentPage('quiz-questions')}
            >
              Start the Quiz
            </button>
          </div>
        </div>;
      default:
        return <MyRoutine
          routine={routine}
          onStartQuiz={() => setCurrentPage('quiz-questions')}
          onViewHistory={() => setCurrentPage('history')}
        />;
    }
  };

  // Show auth screen if user is not logged in
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Navbar
        user={user}
        onLogout={handleLogout}
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />

      <main className="App-main">
        {renderCurrentPage()}
      </main>

      <footer className="app-footer">
        <p>© 2025 Skin-First. All rights reserved.</p>
        <p>Your Personal AI Skincare Advisor</p>
      </footer>
    </div>
  );
}

export default App;
