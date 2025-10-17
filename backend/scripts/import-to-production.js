const fs = require('fs');
const path = require('path');

// Read from .env.production.local if it exists, otherwise use default
const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const GRAPHQL_ENDPOINT = `${STRAPI_URL}/graphql`;

console.log(`🚀 Importing products to: ${STRAPI_URL}\n`);

// Load products from JSON file
const productsJsonPath = path.join(__dirname, '..', 'products.json');
const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
const newProducts = productsData.products;

console.log(`📦 Loaded ${newProducts.length} products from JSON file\n`);

async function createProduct(productData) {
  const mutation = `
    mutation CreateProduct(
      $name: String!
      $slug: String!
      $description: JSON!
      $price: Float!
      $category: ENUM_PRODUCT_CATEGORY!
      $rarity: ENUM_PRODUCT_RARITY!
      $rarityColor: String
      $breathingStyle: ENUM_PRODUCT_BREATHINGSTYLE
      $weaponType: ENUM_PRODUCT_WEAPONTYPE
      $inStock: Boolean!
      $featured: Boolean!
      $sharpness: Int
      $durability: Int
      $speed: Int
      $power: Int
      $defense: Int
      $weight: Float
      $material: String
      $manufacturer: String
      $aiFeature: String
      $stockCount: Int
    ) {
      createProduct(
        data: {
          name: $name
          slug: $slug
          description: $description
          price: $price
          category: $category
          rarity: $rarity
          rarityColor: $rarityColor
          breathingStyle: $breathingStyle
          weaponType: $weaponType
          inStock: $inStock
          featured: $featured
          sharpness: $sharpness
          durability: $durability
          speed: $speed
          power: $power
          defense: $defense
          weight: $weight
          material: $material
          manufacturer: $manufacturer
          aiFeature: $aiFeature
          stockCount: $stockCount
        }
      ) {
        data {
          id
          attributes {
            name
            slug
          }
        }
      }
    }
  `;

  const variables = {
    name: productData.name,
    slug: productData.slug,
    description: productData.description,
    price: productData.price,
    category: productData.category,
    rarity: productData.rarity,
    rarityColor: productData.rarityColor || null,
    breathingStyle: productData.breathingStyle || null,
    weaponType: productData.weaponType || null,
    inStock: productData.inStock,
    featured: productData.featured,
    sharpness: productData.sharpness || null,
    durability: productData.durability || null,
    speed: productData.speed || null,
    power: productData.power || null,
    defense: productData.defense || null,
    weight: productData.weight || null,
    material: productData.material || null,
    manufacturer: productData.manufacturer || null,
    aiFeature: productData.aiFeature || null,
    stockCount: productData.stockCount || 10
  };

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables: variables,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error(`❌ Error creating product "${productData.name}":`, result.errors[0].message);
      return false;
    }

    console.log(`✅ Created: ${productData.name} (${productData.slug})`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating product "${productData.name}":`, error.message);
    return false;
  }
}

async function importAllProducts() {
  console.log('🔄 Starting product import...\n');
  
  let successCount = 0;
  let failCount = 0;

  for (const product of newProducts) {
    const success = await createProduct(product);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Import Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📦 Total: ${newProducts.length}`);
  console.log('='.repeat(50));
}

// Run the import
importAllProducts()
  .then(() => {
    console.log('\n✨ Import process completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Import process failed:', error);
    process.exit(1);
  });
