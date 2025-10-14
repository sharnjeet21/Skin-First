const axios = require('axios');

async function testServer() {
  try {
    console.log('Testing server connection...');
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:5001/api/health');
    console.log('✅ Health check:', healthResponse.data);
    
    // Test registration
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    
    try {
      const registerResponse = await axios.post('http://localhost:5001/api/auth/register', registerData);
      console.log('✅ Registration successful:', registerResponse.data);
    } catch (regError) {
      if (regError.response?.data?.error === 'User already exists with this email') {
        console.log('ℹ️  User already exists, trying login...');
        
        // Test login
        const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
          email: registerData.email,
          password: registerData.password
        });
        console.log('✅ Login successful:', loginResponse.data);
      } else {
        throw regError;
      }
    }
    
  } catch (error) {
    console.error('❌ Server test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testServer();