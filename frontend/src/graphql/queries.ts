import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int, $start: Int, $filters: ProductFiltersInput) {
    products(
      pagination: { limit: $limit, start: $start }
      filters: $filters
      sort: "createdAt:desc"
    ) {
      data {
        id
        attributes {
          name
          slug
          description
          price
          category
          rarity
          weaponType
          breathingStyle
          featured
          inStock
          stockCount
          imageUrl
          imageAlt
          image {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
          }
          createdAt
          updatedAt
        }
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      data {
        id
        attributes {
          name
          slug
          description
          price
          category
          rarity
          weaponType
          breathingStyle
          featured
          inStock
          stockCount
          imageUrl
          imageAlt
          specifications
          image {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
          }
          gallery {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($query: String!, $limit: Int) {
    products(
      filters: {
        or: [
          { name: { containsi: $query } }
          { description: { containsi: $query } }
          { category: { containsi: $query } }
          { weaponType: { containsi: $query } }
          { breathingStyle: { containsi: $query } }
        ]
      }
      pagination: { limit: $limit }
      sort: "createdAt:desc"
    ) {
      data {
        id
        attributes {
          name
          slug
          description
          price
          category
          rarity
          weaponType
          breathingStyle
          featured
          inStock
          stockCount
          imageUrl
          imageAlt
          image {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts($limit: Int) {
    products(
      filters: { featured: { eq: true } }
      pagination: { limit: $limit }
      sort: "createdAt:desc"
    ) {
      data {
        id
        attributes {
          name
          slug
          description
          price
          category
          rarity
          weaponType
          breathingStyle
          featured
          inStock
          stockCount
          imageUrl
          imageAlt
          image {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;