const axios = require('axios');

async function testDelete() {
  try {
    // First, let's test if we can get content
    console.log('Testing backend connection...');
    
    // Test with a sample token and content ID
    const token = 'your-token-here'; // Replace with actual token
    const contentId = 'your-content-id-here'; // Replace with actual content ID
    
    console.log('Attempting to delete content...');
    console.log('Content ID:', contentId);
    console.log('Token present:', !!token);
    
    const response = await axios.delete(`http://localhost:3000/content/${contentId}`, {
      headers: {
        token: token
      }
    });
    
    console.log('Delete successful:', response.data);
  } catch (error) {
    console.error('Delete failed:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
  }
}

testDelete();
