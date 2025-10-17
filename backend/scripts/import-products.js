const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://127.0.0.1:1337';
const GRAPHQL_ENDPOINT = `${STRAPI_URL}/graphql`;

// Load products from JSON file
const productsJsonPath = path.join(__dirname, '..', 'products.json');
const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
const newProducts = productsData.products;

console.log(`Loaded ${newProducts.length} products from JSON file\n`);

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
        }
      ) {
        documentId
        name
      }
    }
  `;

  // Convert plain text description to Strapi blocks format
  const descriptionBlocks = [
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: productData.description
        }
      ]
    }
  ];

  // Convert enum values to GraphQL format (replace spaces with underscores)
  const toEnumValue = (str) => str ? str.replace(/ /g, '_') : null;
  
  // Generate slug if not provided
  const slug = productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const variables = {
    name: productData.name,
    slug: slug,
    description: descriptionBlocks,
    price: productData.price,
    category: toEnumValue(productData.category),
    rarity: toEnumValue(productData.rarity),
    rarityColor: productData.rarityColor || null,
    breathingStyle: toEnumValue(productData.breathingStyle),
    weaponType: toEnumValue(productData.weaponType),
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
    aiFeature: productData.aiFeature || null
  };

  console.log(`Creating: ${productData.name}`);
  
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables: variables })
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error(`  ✗ Error:`, result.errors[0].message);
      console.error(`     Details:`, JSON.stringify(result.errors[0], null, 2));
      return false;
    } else {
      console.log(`  ✓ Created (ID: ${result.data.createProduct.documentId})`);
      return true;
    }
  } catch (error) {
    console.error(`  ✗ Error:`, error.message);
    console.error(`     Stack:`, error.stack);
    console.error(`     Cause:`, error.cause);
    return false;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('SLAYERFORGE PRODUCT IMPORT');
  console.log('='.repeat(60));
  console.log('');
  
  try {
    let successCount = 0;
    let errorCount = 0;
    
    for (const product of newProducts) {
      const success = await createProduct(product);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total products: ${newProducts.length}`);
    console.log(`✓ Successfully imported: ${successCount}`);
    if (errorCount > 0) {
      console.log(`✗ Failed: ${errorCount}`);
    }
    console.log('\nNote: Images need to be uploaded manually through Strapi admin.');
    console.log('Visit: http://localhost:1337/admin');
    
  } catch (error) {
    console.error('\n✗ Import failed:', error.message);
    process.exit(1);
  }
}

main();