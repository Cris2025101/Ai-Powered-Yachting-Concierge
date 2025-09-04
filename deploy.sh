#!/bin/bash

# Yaga Concierge Deployment Script
# This script helps you deploy to Vercel or Railway

echo "🚀 Yaga Concierge Deployment Helper"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Yaga Concierge ready for deployment"
    echo "✅ Git repository initialized"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found!"
    echo "📋 Please copy env.example to .env.local and add your API keys:"
    echo "   cp env.example .env.local"
    echo "   # Then edit .env.local with your actual keys"
    exit 1
fi

echo "✅ Environment file found"

# Build check
echo "🔨 Testing build..."
if npm run build; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo ""
echo "🎯 Choose deployment platform:"
echo "1) Vercel (Recommended)"
echo "2) Railway"
echo "3) Both"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        echo "1. Go to https://vercel.com"
        echo "2. Sign up/Login with GitHub"
        echo "3. Click 'New Project'"
        echo "4. Import your repository"
        echo "5. Add environment variables in Vercel dashboard:"
        echo "   - OPENAI_API_KEY"
        echo "   - NEXT_PUBLIC_SUPABASE_URL"
        echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo "6. Deploy!"
        ;;
    2)
        echo "🚂 Deploying to Railway..."
        echo "1. Install Railway CLI: npm install -g @railway/cli"
        echo "2. Login: railway login"
        echo "3. Initialize: railway init"
        echo "4. Set environment variables:"
        echo "   railway variables set OPENAI_API_KEY=your_key"
        echo "   railway variables set NEXT_PUBLIC_SUPABASE_URL=your_url"
        echo "   railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key"
        echo "5. Deploy: railway up"
        ;;
    3)
        echo "🚀 Deploying to both platforms..."
        echo "Follow the instructions for both Vercel and Railway above."
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment instructions completed!"
echo "📖 Check DEPLOYMENT.md for detailed steps"
