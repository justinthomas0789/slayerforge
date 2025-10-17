const fs = require('fs');const STRAPI_URL = 'http://localhost:1337';

const path = require('path');const GRAPHQL_ENDPOINT = `${STRAPI_URL}/graphql`;



const STRAPI_URL = 'http://localhost:1337';// Use native fetch in Node.js 18+

const GRAPHQL_ENDPOINT = `${STRAPI_URL}/graphql`;const fetch = globalThis.fetch || require('node-fetch');



// Load products from JSON file// New products data from user's JSON

const productsJsonPath = path.join(__dirname, '..', 'products.json');const newProducts = [

console.log('Loading products from:', productsJsonPath);  {

const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));    name: "Nichirin Blade - Sun Breathing Edition",

const newProducts = productsData.products;    description: "The legendary Nichirin Blade infused with the essence of Sun Breathing. This mythic weapon is said to contain the power of Yoriichi Tsugikuni himself. Its crimson blade burns with an eternal flame that can cut through any demon, no matter how powerful. The blade adjusts its properties based on the wielder's breathing technique, making it the ultimate weapon for demon slayers.",

    price: 25000,

console.log(`Loaded ${newProducts.length} products from JSON file\n`);    category: "Weapons",

    rarity: "Mythic",

async function deleteAllProducts() {    rarityColor: "#FF4500",

  console.log('Checking for existing products...');    breathingStyle: "Sun Breathing",

      weaponType: "Katana",

  const fetchQuery = `    inStock: true,

    query {    featured: true,

      products {    sharpness: 100,

        documentId    durability: 100,

        name    speed: 95,

      }    power: 100,

    }    defense: 85,

  `;    weight: 1.2,

      material: "Scarlet Crimson Iron Sand & Scarlet Ore",

  try {    manufacturer: "Haganezuka (Master Swordsmith)",

    const fetchResponse = await fetch(GRAPHQL_ENDPOINT, {    aiFeature: "This blade features an AI-enhanced forging technique that analyzes the user's breathing pattern in real-time and adjusts the blade's weight distribution and edge alignment for maximum efficiency. The integrated micro-sensors detect demon blood composition and optimize cutting angles automatically."

      method: 'POST',  },

      headers: { 'Content-Type': 'application/json' },  {

      body: JSON.stringify({ query: fetchQuery })    name: "Dual Nichirin Blades - Sound Breathing",

    });    description: "Twin Nichirin Blades specifically designed for Sound Breathing users. These explosive blades produce powerful sonic waves with each strike. Used by the Sound Hashira, these weapons can create devastating explosive attacks when used in combination with proper breathing techniques.",

        price: 18000,

    const fetchData = await fetchResponse.json();    category: "Weapons",

        rarity: "Legendary",

    if (fetchData.errors) {    rarityColor: "#FFD700",

      console.log('No existing products found (or schema mismatch)');    breathingStyle: "Sound Breathing",

      return;    weaponType: "Dual Sword",

    }    inStock: true,

        featured: true,

    if (!fetchData.data?.products || fetchData.data.products.length === 0) {    sharpness: 90,

      console.log('No products to delete.');    durability: 88,

      return;    speed: 92,

    }    power: 95,

        defense: 75,

    console.log(`Found ${fetchData.data.products.length} products to delete.\n`);    weight: 2.4,

        material: "Explosive Nichirin Ore",

    for (const product of fetchData.data.products) {    manufacturer: "Tecchin Tecchikawahara"

      console.log(`Deleting: ${product.name}`);  },

        {

      const deleteQuery = `    name: "Serpent Breathing Blade",

        mutation DeleteProduct($documentId: ID!) {    description: "A uniquely curved Nichirin Blade that mimics the movement of a serpent. This legendary weapon can bend and twist in impossible ways, making it perfect for unpredictable attack patterns. The indigo-gray blade is as beautiful as it is deadly.",

          deleteProduct(documentId: $documentId) {    price: 16000,

            documentId    category: "Weapons",

          }    rarity: "Legendary",

        }    breathingStyle: "Serpent Breathing",

      `;    weaponType: "Whip Sword",

          inStock: true,

      await fetch(GRAPHQL_ENDPOINT, {    featured: false,

        method: 'POST',    sharpness: 92,

        headers: { 'Content-Type': 'application/json' },    durability: 85,

        body: JSON.stringify({    speed: 94,

          query: deleteQuery,    power: 88,

          variables: { documentId: product.documentId }    defense: 70,

        })    weight: 1.1,

      });    material: "Flexible Nichirin Steel",

    }    manufacturer: "Kanamori"

      },

    console.log('All existing products deleted.\n');  {

  } catch (error) {    name: "Muzan Tracking Compass",

    console.log('Skipping delete step:', error.message);    description: "An epic-grade mystical compass that can detect the presence of Muzan Kibutsuji and his strongest demons. This rare artifact pulses with a faint glow when demons are nearby, with the intensity increasing based on their power level. Essential equipment for any demon slayer on a hunt.",

  }    price: 8500,

}    category: "Accessories",

    rarity: "Epic",

async function createProduct(productData) {    breathingStyle: "All Styles",

  const mutation = `    weaponType: "Support Gear",

    mutation CreateProduct(    inStock: true,

      $name: String!    featured: false,

      $description: String!    speed: 75,

      $price: Float!    defense: 60,

      $category: String!    weight: 0.3,

      $rarity: String!    material: "Wisteria-Infused Crystal",

      $rarityColor: String    manufacturer: "Demon Slayer Corps R&D",

      $breathingStyle: String    aiFeature: "Equipped with AI-powered demon detection algorithms that can distinguish between different demon types and predict their movement patterns. The compass learns from each encounter and becomes more accurate over time, building a database of demon signatures."

      $weaponType: String  },

      $inStock: Boolean!  {

      $featured: Boolean!    name: "Wisteria Poison Kunai Set",

      $sharpness: Int    description: "A set of 12 kunai coated with concentrated wisteria poison. These throwing weapons are highly effective against demons, causing paralysis and severe burning upon contact. Perfect for ranged combat and surprise attacks.",

      $durability: Int    price: 3500,

      $speed: Int    category: "Weapons",

      $power: Int    rarity: "Rare",

      $defense: Int    breathingStyle: "All Styles",

      $weight: Float    weaponType: "Throwing",

      $material: String    inStock: true,

      $manufacturer: String    featured: false,

      $aiFeature: String    sharpness: 75,

    ) {    speed: 88,

      createProduct(    power: 70,

        data: {    weight: 0.8,

          name: $name    material: "Steel with Wisteria Extract",

          description: $description    manufacturer: "Shinobu Kocho"

          price: $price  },

          category: $category  {

          rarity: $rarity    name: "Hashira Haori - Flame Pattern",

          rarityColor: $rarityColor    description: "The iconic haori worn by the Flame Hashira. This legendary garment is woven with flame-resistant fibers and provides excellent protection while maintaining mobility. The striking flame pattern symbolizes the unwavering spirit of the Flame Breathing users.",

          breathingStyle: $breathingStyle    price: 12000,

          weaponType: $weaponType    category: "Armor",

          inStock: $inStock    rarity: "Legendary",

          featured: $featured    breathingStyle: "Flame Breathing",

          sharpness: $sharpness    weaponType: "Cloak",

          durability: $durability    inStock: true,

          speed: $speed    featured: true,

          power: $power    durability: 90,

          defense: $defense    defense: 85,

          weight: $weight    weight: 1.5,

          material: $material    material: "Flame-Resistant Silk",

          manufacturer: $manufacturer    manufacturer: "Demon Slayer Corps Tailors"

          aiFeature: $aiFeature  },

        }  {

      ) {    name: "Kasugai Crow Communication Device",

        documentId    description: "An advanced communication device disguised as a traditional crow charm. This epic device allows instant communication with other demon slayers and the Demon Slayer Corps headquarters. It can also be used to call for backup during emergencies.",

        name    price: 6000,

      }    category: "Support Devices",

    }    rarity: "Epic",

  `;    breathingStyle: "Adaptive",

    weaponType: "Support Gear",

  // Map the JSON product data to GraphQL variables    inStock: true,

  const variables = {    featured: false,

    name: productData.name,    speed: 80,

    description: productData.description,    defense: 50,

    price: productData.price,    weight: 0.2,

    category: productData.category,    material: "Enchanted Wood & Crystal",

    rarity: productData.rarity,    manufacturer: "Ubuyashiki Family",

    rarityColor: productData.rarityColor || null,    aiFeature: "Features AI-driven message routing and priority assessment. Can automatically alert nearby demon slayers of emergencies, translate messages between different languages, and provide real-time tactical suggestions based on mission parameters."

    breathingStyle: productData.breathingStyle || null,  },

    weaponType: productData.weaponType || null,  {

    inStock: productData.inStock,    name: "Regeneration Breathing Mask",

    featured: productData.featured,    description: "A mythic-tier support device that enhances the user's breathing efficiency by 300%. This revolutionary mask filters air and infuses it with trace amounts of wisteria essence, allowing demon slayers to maintain their breathing techniques for much longer periods without exhaustion.",

    sharpness: productData.sharpness || null,    price: 20000,

    durability: productData.durability || null,    category: "Support Devices",

    speed: productData.speed || null,    rarity: "Mythic",

    power: productData.power || null,    rarityColor: "#FF4500",

    defense: productData.defense || null,    breathingStyle: "Adaptive",

    weight: productData.weight || null,    weaponType: "Support Gear",

    material: productData.material || null,    inStock: true,

    manufacturer: productData.manufacturer || null,    featured: true,

    aiFeature: productData.aiFeature || null    durability: 95,

  };    speed: 70,

    defense: 80,

  console.log(`Creating: ${productData.name}`);    weight: 0.4,

      material: "Wisteria-Infused Ceramic",

  try {    manufacturer: "Tamayo & Yushiro",

    const response = await fetch(GRAPHQL_ENDPOINT, {    aiFeature: "Advanced AI monitors the user's vital signs, oxygen levels, and breathing patterns in real-time. Automatically adjusts air mixture and resistance to optimize performance. Can detect early signs of fatigue and trigger emergency protocols, including releasing emergency stamina-boosting compounds."

      method: 'POST',  },

      headers: { 'Content-Type': 'application/json' },  {

      body: JSON.stringify({    name: "Emergency Demon Antidote Kit",

        query: mutation,    description: "A rare medical kit containing antidotes for various demon poisons and blood demon arts. Includes bandages infused with wisteria extract, blood coagulants, and pain suppressants. Essential for survival in demon-infested territories.",

        variables: variables    price: 4500,

      })    category: "Medical",

    });    rarity: "Rare",

    breathingStyle: "All Styles",

    const result = await response.json();    weaponType: "Healing Kit",

        inStock: true,

    if (result.errors) {    featured: false,

      console.error(`  ✗ Error:`, result.errors[0].message);    defense: 65,

      return false;    weight: 0.6,

    } else {    material: "Wisteria Extract & Medical Supplies",

      console.log(`  ✓ Created successfully (ID: ${result.data.createProduct.documentId})`);    manufacturer: "Shinobu Kocho"

      return true;  },

    }  {

  } catch (error) {    name: "Total Concentration Breathing AI Core",

    console.error(`  ✗ Error:`, error.message);    description: "The ultimate mythic support device - an AI core that can be integrated into any equipment. This revolutionary technology analyzes breathing patterns, predicts demon movements, and provides real-time tactical advice during combat. Developed through years of research combining traditional demon slayer techniques with cutting-edge technology.",

    return false;    price: 50000,

  }    category: "Support Devices",

}    rarity: "Mythic",

    rarityColor: "#9400D3",

async function main() {    breathingStyle: "Adaptive",

  console.log('='.repeat(60));    weaponType: "AI Core",

  console.log('SLAYERFORGE PRODUCT IMPORT');    inStock: true,

  console.log('='.repeat(60));    featured: true,

  console.log('');    speed: 85,

      power: 90,

  try {    defense: 88,

    // Step 1: Delete existing products (optional, skip if already deleted)    weight: 0.5,

    await deleteAllProducts();    material: "Quantum Crystal Matrix",

        manufacturer: "Demon Slayer Corps Advanced Tech Division",

    // Step 2: Create new products    aiFeature: "The pinnacle of demon slayer technology. This AI core features quantum processing capabilities that can simulate millions of combat scenarios per second. It learns from every battle, building an ever-expanding database of demon abilities and optimal counter-strategies. Can interface with all breathing styles and provide personalized training regimens. The AI can also detect hidden demons through micro-vibration analysis and predict attack patterns with 96.7% accuracy."

    console.log('Creating new products...\n');  }

    let successCount = 0;];

    let errorCount = 0;

    async function deleteAllProducts() {

    for (const product of newProducts) {  console.log('Fetching all products...');

      const success = await createProduct(product);  

      if (success) {  const fetchQuery = `

        successCount++;    query {

      } else {      products {

        errorCount++;        documentId

      }        name

    }      }

        }

    console.log('\n' + '='.repeat(60));  `;

    console.log('IMPORT SUMMARY');  

    console.log('='.repeat(60));  const fetchResponse = await fetch(GRAPHQL_ENDPOINT, {

    console.log(`Total products: ${newProducts.length}`);    method: 'POST',

    console.log(`✓ Successfully imported: ${successCount}`);    headers: { 'Content-Type': 'application/json' },

    if (errorCount > 0) {    body: JSON.stringify({ query: fetchQuery })

      console.log(`✗ Failed: ${errorCount}`);  });

    }  

    console.log('\nNote: Images need to be uploaded manually through Strapi admin panel.');  const fetchData = await fetchResponse.json();

    console.log('Visit: http://localhost:1337/admin');  

      if (!fetchData.data?.products) {

  } catch (error) {    console.log('No products found to delete.');

    console.error('\n✗ Import failed:', error.message);    return;

    process.exit(1);  }

  }  

}  console.log(`Found ${fetchData.data.products.length} products to delete.`);

  

main();  for (const product of fetchData.data.products) {

    console.log(`Deleting product: ${product.name} (${product.documentId})`);
    
    const deleteQuery = `
      mutation DeleteProduct($documentId: ID!) {
        deleteProduct(documentId: $documentId) {
          documentId
        }
      }
    `;
    
    await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: deleteQuery,
        variables: { documentId: product.documentId }
      })
    });
  }
  
  console.log('All products deleted successfully.');
}

async function createProduct(productData) {
  const mutation = `
    mutation CreateProduct(
      $name: String!
      $description: String!
      $price: Float!
      $category: String!
      $rarity: String!
      $rarityColor: String
      $breathingStyle: String
      $weaponType: String
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

  console.log(`Creating product: ${productData.name}`);
  
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: mutation,
      variables: productData
    })
  });

  const result = await response.json();
  
  if (result.errors) {
    console.error(`Error creating ${productData.name}:`, JSON.stringify(result.errors, null, 2));
  } else {
    console.log(`✓ Created: ${productData.name} (${result.data.createProduct.documentId})`);
  }
  
  return result;
}

async function main() {
  console.log('Starting product import...\n');
  
  try {
    // Step 1: Delete all existing products
    await deleteAllProducts();
    console.log('\n---\n');
    
    // Step 2: Create new products
    console.log('Creating new products...\n');
    for (const product of newProducts) {
      await createProduct(product);
    }
    
    console.log('\n---\n');
    console.log('✓ Import completed successfully!');
    console.log(`Total products imported: ${newProducts.length}`);
    console.log('\nNote: Images need to be uploaded manually through Strapi admin panel.');
    
  } catch (error) {
    console.error('Error during import:', error);
    process.exit(1);
  }
}

main();
