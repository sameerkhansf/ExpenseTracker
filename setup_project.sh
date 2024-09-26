#!/bin/bash

# Create main directories
mkdir -p src/{app,components,lib,styles,types}
mkdir -p src/app/{api,auth,dashboard,expenses}

# Create main app files
touch src/app/layout.tsx
touch src/app/page.tsx

# Create API routes
touch src/app/api/auth/[...nextauth]/route.ts
touch src/app/api/expenses/route.ts

# Create auth pages
touch src/app/auth/login/page.tsx
touch src/app/auth/signup/page.tsx

# Create dashboard and expenses pages
touch src/app/dashboard/page.tsx
touch src/app/expenses/add/page.tsx
touch src/app/expenses/[id]/page.tsx

# Create components
touch src/components/Layout.tsx
touch src/components/Navbar.tsx
touch src/components/ExpenseForm.tsx
touch src/components/ExpenseList.tsx

# Create lib files
touch src/lib/db.ts
touch src/lib/auth.ts

# Create styles
touch src/styles/globals.css

# Create type definitions
touch src/types/index.ts

# Create configuration files
touch .env.local
touch next.config.js
touch tsconfig.json

# Create README
touch README.md

# Initialize package.json
npm init -y

# Install necessary dependencies
npm install next react react-dom mongodb
npm install -D typescript @types/react @types/node

# Add scripts to package.json
npm pkg set scripts.dev="next dev"
npm pkg set scripts.build="next build"
npm pkg set scripts.start="next start"

# Create a basic .env.local file
echo "MONGODB_URI=your_mongodb_uri_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000" > .env.local

# Create a basic next.config.js file
echo "/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig" > next.config.js

# Create a basic tsconfig.json file
echo '{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}' > tsconfig.json

echo "Project structure created successfully!"
