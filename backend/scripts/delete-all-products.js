const STRAPI_URL = 'http://localhost:1337';
const GRAPHQL_ENDPOINT = `${STRAPI_URL}/graphql`;

async function deleteAllProducts() {
  console.log('Fetching all products...');
  
  const fetchQuery = `
    query {
      products {
        documentId
        name
      }
    }
  `;
  
  try {
    const fetchResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: fetchQuery })
    });
    
    const fetchData = await fetchResponse.json();
    
    if (fetchData.errors) {
      console.error('Error fetching products:', JSON.stringify(fetchData.errors, null, 2));
      console.log('\nThis is likely because existing products have old enum values.');
      console.log('We need to delete them directly from the database.');
      return false;
    }
    
    if (!fetchData.data?.products || fetchData.data.products.length === 0) {
      console.log('No products found to delete.');
      return true;
    }
    
    console.log(`Found ${fetchData.data.products.length} products to delete.\n`);
    
    for (const product of fetchData.data.products) {
      console.log(`Deleting: ${product.name} (${product.documentId})`);
      
      const deleteQuery = `
        mutation DeleteProduct($documentId: ID!) {
          deleteProduct(documentId: $documentId) {
            documentId
          }
        }
      `;
      
      const deleteResponse = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: deleteQuery,
          variables: { documentId: product.documentId }
        })
      });
      
      const deleteResult = await deleteResponse.json();
      
      if (deleteResult.errors) {
        console.error(`  ✗ Error deleting ${product.name}:`, deleteResult.errors[0].message);
      } else {
        console.log(`  ✓ Deleted successfully`);
      }
    }
    
    console.log('\n✓ All products deleted successfully!');
    return true;
    
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

deleteAllProducts()
  .then(success => {
    if (success) {
      console.log('\nYou can now run the import script to add new products:');
      console.log('  node scripts/import-new-products.js');
    } else {
      console.log('\nPlease stop the Strapi backend and manually delete the database:');
      console.log('  1. Stop the backend (Ctrl+C)');
      console.log('  2. Delete: backend\\.tmp\\data.db');
      console.log('  3. Restart: npm run develop');
      console.log('  4. Run: node scripts/import-new-products.js');
    }
    process.exit(success ? 0 : 1);
  });
