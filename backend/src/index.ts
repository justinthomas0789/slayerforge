// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set up public permissions for GraphQL
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        // Find existing permissions for Product API
        const permissions = await strapi
          .query('plugin::users-permissions.permission')
          .findMany({
            where: {
              role: publicRole.id,
              action: {
                $in: [
                  'api::product.product.find',
                  'api::product.product.findOne',
                ],
              },
            },
          });

        // Update each permission individually
        for (const permission of permissions) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: permission.id },
              data: { enabled: true },
            });
        }

        console.log('✅ Public permissions set for Product API');
      }
    } catch (error) {
      console.error('⚠️  Could not set permissions:', error.message);
    }

    // Import products if database is empty
    const productCount = await strapi.entityService.count('api::product.product');
    
    if (productCount === 0) {
      console.log('📦 No products found. Importing from products.json...');
      
      const fs = require('fs');
      const path = require('path');
      
      try {
        const productsJsonPath = path.join(__dirname, '..', 'products.json');
        const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
        
        for (const productData of productsData.products) {
          // Remove id and transform data for Strapi
          const { id, image, gallery, ...productAttrs } = productData;
          
          await strapi.entityService.create('api::product.product', {
            data: {
              ...productAttrs,
              publishedAt: new Date(),
            },
          });
        }
        
        console.log(`✅ Successfully imported ${productsData.products.length} products`);
      } catch (error) {
        console.error('❌ Error importing products:', error);
      }
    } else {
      console.log(`ℹ️  Database already has ${productCount} products`);
    }
  },
};
