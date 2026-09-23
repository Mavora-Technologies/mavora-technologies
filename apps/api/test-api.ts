async function testApi() {
  const baseUrl = 'http://localhost:5000/api';

  try {
    console.log('1️⃣ Testing Health Check endpoint...');
    const healthRes = await fetch(`${baseUrl}/health`);
    const healthData = await healthRes.json();
    console.log('✅ Health Response:', healthData);

    console.log('\n2️⃣ Testing Lead Creation endpoint...');
    const leadRes = await fetch(`${baseUrl}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'Jane Smith',
        email: `jane_${Date.now()}@mavora.com`,
        phone: '+1234567890',
        company: 'Mavora Client Corp',
        service: 'Custom Software Architecture',
        message: 'Looking for a dedicated backend architecture partner.',
        source: 'Website API Test',
      }),
    });

    const leadData = await leadRes.json();
    if (leadRes.ok) {
      console.log('✅ Lead Created Successfully:', leadData);
    } else {
      console.error('❌ Failed to create lead:', leadData);
    }
  } catch (error) {
    console.error('❌ API test error (Is your server running?):', error);
  }
}

testApi();