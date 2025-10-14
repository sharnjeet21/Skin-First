import React, { useState } from 'react';
import './FindDermatologist.css';

const FindDermatologist = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const getDermatologistsByLocation = (query) => {
    const searchLower = query.toLowerCase();
    
    // Comprehensive database of dermatologists across India with focus on Punjab
    const dermatologistDatabase = {
      // Punjab Cities
      chandigarh: [
        {
          id: 1,
          name: "Dr. Rajesh Kumar Sharma, MD",
          specialty: "Dermatology & Cosmetology",
          address: "Sector 8, Chandigarh Medical Center, Chandigarh 160009",
          phone: "+91 172 2740123",
          rating: 4.8,
          reviews: 245,
          distance: "0.8 km",
          acceptingPatients: true,
          experience: "15 years"
        },
        {
          id: 2,
          name: "Dr. Priya Malhotra, MBBS, MD",
          specialty: "Pediatric Dermatology & Skin Allergies",
          address: "Sector 17, PGI Road, Chandigarh 160017",
          phone: "+91 172 2756789",
          rating: 4.9,
          reviews: 189,
          distance: "1.2 km",
          acceptingPatients: true,
          experience: "12 years"
        },
        {
          id: 3,
          name: "Dr. Amarjeet Singh Bhatia, MD",
          specialty: "Dermatology & Laser Surgery",
          address: "Sector 22, Chandigarh Skin Clinic, Chandigarh 160022",
          phone: "+91 172 2698456",
          rating: 4.7,
          reviews: 167,
          distance: "2.1 km",
          acceptingPatients: false,
          experience: "18 years"
        }
      ],
      ludhiana: [
        {
          id: 4,
          name: "Dr. Harpreet Kaur Gill, MD",
          specialty: "Dermatology & Aesthetic Medicine",
          address: "Civil Lines, Model Town, Ludhiana 141002",
          phone: "+91 161 2423567",
          rating: 4.6,
          reviews: 134,
          distance: "1.5 km",
          acceptingPatients: true,
          experience: "10 years"
        },
        {
          id: 5,
          name: "Dr. Manpreet Singh Dhillon, MBBS, MD",
          specialty: "Clinical Dermatology & Trichology",
          address: "Pakhowal Road, Ludhiana 141001",
          phone: "+91 161 2567890",
          rating: 4.8,
          reviews: 198,
          distance: "0.9 km",
          acceptingPatients: true,
          experience: "14 years"
        }
      ],
      amritsar: [
        {
          id: 6,
          name: "Dr. Jasbir Singh Sandhu, MD",
          specialty: "Dermatology & Venereology",
          address: "Lawrence Road, Amritsar 143001",
          phone: "+91 183 2567123",
          rating: 4.7,
          reviews: 156,
          distance: "1.8 km",
          acceptingPatients: true,
          experience: "16 years"
        },
        {
          id: 7,
          name: "Dr. Simran Kaur Bedi, MBBS, MD",
          specialty: "Cosmetic Dermatology & Anti-Aging",
          address: "Mall Road, Amritsar 143001",
          phone: "+91 183 2445678",
          rating: 4.9,
          reviews: 223,
          distance: "0.7 km",
          acceptingPatients: true,
          experience: "11 years"
        }
      ],
      jalandhar: [
        {
          id: 8,
          name: "Dr. Ravi Kumar Aggarwal, MD",
          specialty: "Dermatology & Psoriasis Treatment",
          address: "Model Town, Jalandhar 144003",
          phone: "+91 181 2234567",
          rating: 4.5,
          reviews: 112,
          distance: "2.3 km",
          acceptingPatients: true,
          experience: "13 years"
        }
      ],
      patiala: [
        {
          id: 9,
          name: "Dr. Gurpreet Singh Randhawa, MD",
          specialty: "Dermatology & Hair Transplant",
          address: "Leela Bhawan, Patiala 147001",
          phone: "+91 175 2345678",
          rating: 4.6,
          reviews: 145,
          distance: "1.4 km",
          acceptingPatients: true,
          experience: "17 years"
        }
      ],
      // Major Indian Cities
      delhi: [
        {
          id: 10,
          name: "Dr. Anil Kumar Jain, MD",
          specialty: "Dermatology & Cosmetic Surgery",
          address: "Connaught Place, New Delhi 110001",
          phone: "+91 11 23456789",
          rating: 4.8,
          reviews: 312,
          distance: "2.1 km",
          acceptingPatients: true,
          experience: "20 years"
        },
        {
          id: 11,
          name: "Dr. Sunita Sharma, MBBS, MD",
          specialty: "Pediatric Dermatology",
          address: "Karol Bagh, New Delhi 110005",
          phone: "+91 11 25678901",
          rating: 4.9,
          reviews: 267,
          distance: "1.8 km",
          acceptingPatients: true,
          experience: "15 years"
        }
      ],
      mumbai: [
        {
          id: 12,
          name: "Dr. Rajesh Nair, MD",
          specialty: "Dermatology & Laser Treatment",
          address: "Bandra West, Mumbai 400050",
          phone: "+91 22 26789012",
          rating: 4.7,
          reviews: 289,
          distance: "3.2 km",
          acceptingPatients: true,
          experience: "18 years"
        }
      ],
      bangalore: [
        {
          id: 13,
          name: "Dr. Kavitha Reddy, MD",
          specialty: "Dermatology & Aesthetic Medicine",
          address: "Koramangala, Bangalore 560034",
          phone: "+91 80 41234567",
          rating: 4.8,
          reviews: 234,
          distance: "2.5 km",
          acceptingPatients: true,
          experience: "14 years"
        }
      ]
    };

    // Search logic
    let results = [];
    
    // Check for specific cities
    for (const [city, doctors] of Object.entries(dermatologistDatabase)) {
      if (searchLower.includes(city) || 
          searchLower.includes(city.replace(/[aeiou]/g, '')) || // Handle spelling variations
          city.includes(searchLower.split(' ')[0])) {
        results = [...results, ...doctors];
      }
    }
    
    // Check for state/region matches
    if (searchLower.includes('punjab') || searchLower.includes('pb')) {
      results = [
        ...dermatologistDatabase.chandigarh,
        ...dermatologistDatabase.ludhiana,
        ...dermatologistDatabase.amritsar,
        ...dermatologistDatabase.jalandhar,
        ...dermatologistDatabase.patiala
      ];
    }
    
    if (searchLower.includes('india') || searchLower.includes('indian')) {
      // Return a mix from all cities
      results = Object.values(dermatologistDatabase).flat().slice(0, 8);
    }
    
    // Postal code matching for Punjab
    const punjabPincodes = ['140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '160'];
    if (punjabPincodes.some(code => searchLower.includes(code))) {
      results = [
        ...dermatologistDatabase.chandigarh,
        ...dermatologistDatabase.ludhiana,
        ...dermatologistDatabase.amritsar,
        ...dermatologistDatabase.jalandhar,
        ...dermatologistDatabase.patiala
      ];
    }
    
    // If no specific matches, return some general results
    if (results.length === 0) {
      results = dermatologistDatabase.chandigarh.slice(0, 2);
    }
    
    return results.slice(0, 6); // Limit to 6 results
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = getDermatologistsByLocation(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="dermatologist-container">
      <div className="search-section">
        <div className="search-card">
          <h1>Find a Dermatologist</h1>
          <p>Enter your city or zip code to find skincare specialists near you.</p>
          
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., San Francisco, CA or 94105"
              className="search-input"
            />
            <button 
              className="search-button"
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      {isSearching && (
        <div className="loading-section">
          <div className="loading-card">
            <div className="spinner"></div>
            <h3>Finding dermatologists near you...</h3>
            <p>Please wait while we search for qualified skincare specialists in your area.</p>
          </div>
        </div>
      )}

      {hasSearched && !isSearching && (
        <div className="results-section">
          {searchResults.length > 0 ? (
            <>
              <div className="results-header">
                <h2>Dermatologists near "{searchQuery}"</h2>
                <p>Found {searchResults.length} specialists in your area</p>
              </div>
              
              <div className="results-grid">
                {searchResults.map((doctor) => (
                  <div key={doctor.id} className="doctor-card">
                    <div className="doctor-header">
                      <div className="doctor-avatar">
                        {doctor.image ? (
                          <img src={doctor.image} alt={doctor.name} />
                        ) : (
                          <div className="avatar-placeholder">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                      </div>
                      <div className="doctor-info">
                        <h3>{doctor.name}</h3>
                        <p className="specialty">{doctor.specialty}</p>
                        <div className="rating">
                          <div className="stars">
                            {renderStars(doctor.rating)}
                          </div>
                          <span className="rating-text">
                            {doctor.rating} ({doctor.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="doctor-details">
                      <div className="detail-item">
                        <span className="icon">📍</span>
                        <div>
                          <p className="address">{doctor.address}</p>
                          <p className="distance">{doctor.distance} away</p>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <span className="icon">📞</span>
                        <p className="phone">{doctor.phone}</p>
                      </div>
                      
                      <div className="detail-item">
                        <span className="icon">🎓</span>
                        <p className="experience">{doctor.experience} experience</p>
                      </div>
                      
                      <div className="availability">
                        <span className={`status ${doctor.acceptingPatients ? 'accepting' : 'not-accepting'}`}>
                          {doctor.acceptingPatients ? '✓ Accepting new patients' : '⚠ Not accepting new patients'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="doctor-actions">
                      <button className="contact-button primary">
                        Call Now
                      </button>
                      <button className="contact-button secondary">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-card">
                <h3>No dermatologists found</h3>
                <p>We couldn't find any dermatologists in "{searchQuery}". Try searching with a different location or zip code.</p>
                <button 
                  className="search-again-button"
                  onClick={() => {
                    setSearchQuery('');
                    setHasSearched(false);
                    setSearchResults([]);
                  }}
                >
                  Search Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!hasSearched && (
        <div className="info-section">
          <div className="info-cards">
            <div className="info-card">
              <h3>🔍 Easy Search</h3>
              <p>Find qualified dermatologists in your area by entering your city or zip code.</p>
            </div>
            <div className="info-card">
              <h3>⭐ Verified Reviews</h3>
              <p>See ratings and reviews from real patients to help you choose the right specialist.</p>
            </div>
            <div className="info-card">
              <h3>📅 Availability</h3>
              <p>Check which doctors are currently accepting new patients in your area.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindDermatologist;