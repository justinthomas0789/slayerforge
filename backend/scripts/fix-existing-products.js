const STRAPI_URL = 'http://localhost:1337';
const REST_API = `${STRAPI_URL}/api`;

// Use native fetch in Node.js 18+
const fetch = globalThis.fetch || require('node-fetch');

// Mapping from old values to new values
const categoryMap = {
  'swords': 'Weapons',
  'armor': 'Armor',
  'accessories': 'Accessories',
  'techniques': 'Accessories'
};

const breathingStyleMap = {
  'flame': 'Flame Breathing',
  'water': 'Water Breathing',
  'thunder': 'Thunder Breathing',
  'stone': 'Stone Breathing',
  'wind': 'Wind Breathing',
  'mist': 'Mist Breathing',
  'serpent': 'Serpent Breathing',
  'sound': 'Sound Breathing',
  'flower': 'Flower Breathing',
  'insect': 'Insect Breathing',
  'love': 'Love Breathing',
  'beast': 'Beast Breathing',
  'sun': 'Sun Breathing'
};

const weaponTypeMap = {
  'katana': 'Katana',
  'tanto': 'Katana',
  'wakizashi': 'Katana',
  'naginata': 'Katana',
  'bow': 'Throwing',
  'other': 'Support Gear'
};

const rarityMap = {
  'common': 'Common',
  'uncommon': 'Uncommon',
  'rare': 'Rare',
  'epic': 'Epic',
  'legendary': 'Legendary'
};

async function getAllProducts() {
  console.log('Fetching all products from REST API...');
  
  const response = await fetch(`${REST_API}/products?populate=*`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  const data = await response.json();
  return data.data || [];
}

async function updateProduct(documentId, updates) {
  console.log(`Updating product ${documentId}...`);
  
  const response = await fetch(`${REST_API}/products/${documentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: updates })
  });
  
  const result = await response.json();
  
  if (result.error) {
    console.error(`Error updating product:`, result.error);
    return false;
  }
  
  return true;
}

async function main() {
  console.log('Starting product migration...\n');
  
  try {
    const products = await getAllProducts();
    console.log(`Found ${products.length} products to migrate.\n`);
    
    for (const product of products) {
      const oldData = product.attributes;
      const updates = {};
      
      // Update category
      if (oldData.category && categoryMap[oldData.category]) {
        updates.category = categoryMap[oldData.category];
        console.log(`  ${oldData.name}: category "${oldData.category}" → "${updates.category}"`);
      }
      
      // Update breathing style
      if (oldData.breathingStyle && breathingStyleMap[oldData.breathingStyle]) {
        updates.breathingStyle = breathingStyleMap[oldData.breathingStyle];
        console.log(`  ${oldData.name}: breathingStyle "${oldData.breathingStyle}" → "${updates.breathingStyle}"`);
      }
      
      // Update weapon type
      if (oldData.weaponType && weaponTypeMap[oldData.weaponType]) {
        updates.weaponType = weaponTypeMap[oldData.weaponType];
        console.log(`  ${oldData.name}: weaponType "${oldData.weaponType}" → "${updates.weaponType}"`);
      }
      
      // Update rarity
      if (oldData.rarity && rarityMap[oldData.rarity]) {
        updates.rarity = rarityMap[oldData.rarity];
        console.log(`  ${oldData.name}: rarity "${oldData.rarity}" → "${updates.rarity}"`);
      }
      
      // Convert weight from string to number if needed
      if (oldData.weight && typeof oldData.weight === 'string') {
        const weightNum = parseFloat(oldData.weight.replace(/[^0-9.]/g, ''));
        if (!isNaN(weightNum)) {
          updates.weight = weightNum;
          console.log(`  ${oldData.name}: weight "${oldData.weight}" → ${updates.weight}`);
        }
      }
      
      if (Object.keys(updates).length > 0) {
        const success = await updateProduct(product.documentId, updates);
        if (success) {
          console.log(`✓ Updated: ${oldData.name}\n`);
        } else {
          console.log(`✗ Failed: ${oldData.name}\n`);
        }
      } else {
        console.log(`  ${oldData.name}: No updates needed\n`);
      }
    }
    
    console.log('\n---\n');
    console.log('✓ Migration completed successfully!');
    console.log('\nYou can now run the import script to replace these with the new products.');
    
  } catch (error) {
    console.error('Error during migration:', error.message);
    console.log('\nIf you see connection errors, make sure Strapi is running on http://localhost:1337');
    process.exit(1);
  }
}

main();
