/**
 * Script to create the first admin user in Strapi
 * 
 * Usage:
 * Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables, then run:
 * node scripts/create-admin.js
 */

const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@slayerforge.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123!@#';
const ADMIN_FIRSTNAME = process.env.ADMIN_FIRSTNAME || 'Admin';
const ADMIN_LASTNAME = process.env.ADMIN_LASTNAME || 'User';

async function checkAdminExists() {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/init`);
    const data = await response.json();
    return data.data?.hasAdmin || false;
  } catch (error) {
    console.error('❌ Error checking admin status:', error.message);
    return false;
  }
}

async function createAdmin() {
  console.log('🚀 Creating admin user...');
  console.log(`📧 Email: ${ADMIN_EMAIL}`);
  console.log(`🌐 Strapi URL: ${STRAPI_URL}\n`);

  // Check if admin already exists
  const hasAdmin = await checkAdminExists();
  
  if (hasAdmin) {
    console.log('⚠️  Admin user already exists!');
    console.log('💡 Try logging in with your existing credentials or reset the database.');
    return;
  }

  try {
    const response = await fetch(`${STRAPI_URL}/admin/register-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        firstname: ADMIN_FIRSTNAME,
        lastname: ADMIN_LASTNAME,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Failed to create admin:', errorData);
      return;
    }

    const data = await response.json();
    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log(`\n🔗 Admin Panel: ${STRAPI_URL}/admin`);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  }
}

createAdmin()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
