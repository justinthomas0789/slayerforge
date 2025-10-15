# SlayerForge ⚔️ - Complete E-commerce Platform

**The Ultimate E-commerce Platform for Demon Slayers**

A full-stack e-commerce platform built for selling Demon Slayer-themed products. Features a modern, animated UI with complete shopping cart functionality, product management through Strapi CMS, and a dynamic team showcase.

### 🌟 Live Features
- 🎨 Animated hero slider with image backgrounds & transparent gradient overlays
- 🛒 Complete shopping cart (add/remove/update quantities)
- 💳 Full checkout flow with form validation
- 📦 Dynamic product categorization and filtering with real-time counts
- 👥 Team member showcase (12 Demon Slayer characters)
- 💱 INR currency support throughout
- 📱 Fully responsive design
- ⚡ Real-time GraphQL API integration

## 🎯 Features

- **Weapon Catalog** - Browse through an extensive collection of Nichirin blades, armor, and accessories
- **AI Recommendations** - Get personalized weapon suggestions based on your fighting style and demon encounters
- **Advanced Search** - Find the perfect gear with intelligent filtering and search capabilities
- **Responsive Design** - Seamlessly shop on any device, from mobile to desktop
- **Real-time Updates** - Live inventory and pricing updates using GraphQL subscriptions

## 🛠️ Tech Stack

### Backend
- **Strapi CMS** - Headless CMS for content management
- **GraphQL** - Modern API with efficient data fetching
- **SQLite/PostgreSQL** - Flexible database options

### Frontend
- **React 18** - Modern UI library with concurrent features
- **Apollo Client** - Powerful GraphQL client with caching
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd slayerforge
   ```

2. **Set up the backend (Strapi)**
   ```bash
   cd backend
   npm install
   npm run develop
   ```

3. **Set up the frontend (React)**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the applications**
   - Frontend: http://localhost:3000
   - Strapi Admin: http://localhost:1337/admin
   - GraphQL Playground: http://localhost:1337/graphql

## 📁 Project Structure

```
slayerforge/
├── backend/          # Strapi CMS backend
│   ├── src/
│   │   ├── api/      # API routes and controllers
│   │   ├── components/# Reusable content components
│   │   └── extensions/# Custom Strapi extensions
│   └── config/       # Strapi configuration
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/# React components
│   │   ├── pages/    # Page components
│   │   ├── hooks/    # Custom React hooks
│   │   ├── graphql/  # GraphQL queries and mutations
│   │   └── utils/    # Utility functions
│   └── public/       # Static assets
└── docs/            # Documentation
```

## 🎨 Design System

The application follows a Demon Slayer-inspired design system with:
- **Colors**: Deep purples, crimson reds, and steel grays
- **Typography**: Modern, readable fonts with anime-inspired headers
- **Components**: Reusable UI components with consistent styling
- **Animations**: Smooth, sword-like transitions and effects

## 🤖 AI Features

- **Smart Recommendations** - Machine learning-powered product suggestions
- **Natural Language Search** - Search using conversational queries
- **Chatbot Assistant** - AI guide to help choose the right weapons
- **Dynamic Pricing** - AI-optimized pricing based on demand and rarity

## 🧪 Development

### Backend Development
- Strapi admin panel for content management
- Custom API extensions for e-commerce functionality
- GraphQL schema customization
- Database seeding with sample data

### Frontend Development
- Component-driven development with Storybook
- Apollo Client for state management and caching
- Responsive design with Tailwind CSS
- Unit and integration testing with Jest

## 📊 API Documentation

GraphQL schema available at `/graphql` with the following main types:
- `Product` - Weapons and gear items
- `Category` - Product categories (swords, armor, accessories)
- `User` - Customer accounts
- `Order` - Purchase transactions
- `Review` - Customer reviews and ratings

## 🔒 Security

- Authentication with JWT tokens
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Rate limiting

## 📱 Deployment

### Backend (Strapi)
- Deploy to Heroku, DigitalOcean, or AWS
- PostgreSQL database for production
- Environment-specific configurations

### Frontend (React)
- Deploy to Vercel, Netlify, or AWS S3
- Environment variables for API endpoints
- Optimized build with code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎌 Acknowledgments

- Inspired by the Demon Slayer (Kimetsu no Yaiba) anime and manga
- Built for the AI Hackathon challenge
- Thanks to the open-source community for the amazing tools

---

**May your blade stay sharp and your spirit unbroken!** ⚔️🔥
