// Simple Node.js fetch test for Strapi API
import fetch from 'node-fetch';

async function testStrapi() {
  try {
    const res = await fetch('https://strapi.substorm.cc/api/homepage?populate[testimonials][populate]=photo');
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Data:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

testStrapi();
