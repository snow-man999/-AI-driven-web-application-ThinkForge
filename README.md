# ThinkForge

🚀 ThinkForge is a modern, AI-driven web application built to help students, developers, and engineers discover industry-ready project ideas tailored for skill development, hackathons, and resume building.

## Purpose

ThinkForge serves as an innovative idea generator for projects, with a strong focus on:

- **Student-Focused Development**: Tailored specifically for students looking to enhance their portfolios
- **Industry-Ready Projects**: Aligned with current industry demands and practices
- **Skill Development**: Targeted projects that help build specific technical competencies
- **Resume Building**: Projects designed to stand out on resumes and portfolios
- **EdTech Integration**: Bridging education and technology through practical project work

## Main Features

- **Authentication**: Secure user authentication and profile management
- **AI Integration**: Powerful AI-driven project idea generation
- **Personalized Recommendations**: Custom project suggestions based on user skills and interests
- **Industry-Ready Projects**: Discover projects that align with current industry trends and technologies
- **Skill Development Focus**: Find projects that help you develop specific skills you want to improve
- **Hackathon-Ready Ideas**: Get project ideas perfect for hackathons and competitions
- **EdTech Platform**: Educational technology focus for skill enhancement

## Target Audience

- **Developers**: Software developers looking to expand their portfolio or learn new technologies
- **Engineers**: Engineering professionals seeking innovative project ideas
- **Students**: College and university students working on coursework, capstone projects, or building their resumes

## Comprehensive Tech Stack

### Frontend Framework
- **React 18**: Modern JavaScript library for building user interfaces
- **TypeScript**: Strongly typed programming language that builds on JavaScript
- **Vite**: Next-generation frontend build tool that significantly improves the development experience

### UI Components & Styling
- **Tailwind CSS**: Utility-first CSS framework for rapidly building custom designs
- **Shadcn UI**: Component library built on Radix UI primitives
- **Radix UI**: Low-level UI component primitives (accessible, unstyled components)
- **Lucide React**: Beautiful & consistent icon set
- **Framer Motion**: Animation library for React
- **Class Variance Authority (CVA)**: For creating variant components with TypeScript support
- **Tailwind Merge**: Utility for merging Tailwind CSS classes without style conflicts

### Routing & State Management
- **React Router**: For declarative routing in the application
- **React Hook Form**: For efficient form handling with validation
- **Zod**: TypeScript-first schema validation library
- **TanStack React Query**: For data fetching, caching, and state management

### Backend & Database
- **Supabase**: Backend-as-a-Service (BaaS) providing:
  - Authentication
  - PostgreSQL database
  - Storage
  - Serverless functions

### AI Integration
- **Google Gemini API**: For AI-powered project idea generation
  - Used for generating creative project ideas based on user inputs
  - Integrated with customizable prompts

### Notifications & UI Enhancements
- **Sonner**: Toast notification library
- **Embla Carousel**: For carousel/slider components
- **React Day Picker**: For date picking components
- **Recharts**: Composable charting library for data visualization

### Development Tools
- **ESLint**: For code linting
- **TypeScript ESLint**: TypeScript integration for ESLint
- **PostCSS**: Tool for transforming CSS with JavaScript
- **Autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes

### Build & Deployment
- **Vite Build System**: For optimized production builds
- **SWC (via Vite plugin)**: Fast JavaScript/TypeScript compiler

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ksparth12/ThinkForge.git
   cd ThinkForge
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   bun install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   bun run dev
   ```

## Deployment to Vercel

Follow these steps to deploy ThinkForge to Vercel:

1. **Create a Vercel Account**
   - Sign up at [vercel.com](https://vercel.com) if you don't already have an account
   - Connect your GitHub account to Vercel

2. **Prepare Your Project**
   - Make sure your project is pushed to GitHub
   - Ensure all environment variables are properly set up in your `.env.example` file

3. **Deploy from GitHub**
   - Log in to your Vercel dashboard
   - Click on 'Add New...' → 'Project'
   - Select your ThinkForge repository from the list
   - Vercel will automatically detect that it's a Vite + React project

4. **Configure Project Settings**
   - Project Name: Enter a name for your deployment (e.g., 'thinkforge')
   - Framework Preset: Verify that Vite is selected
   - Root Directory: Leave as '/' if your project is at the root of the repository
   - Build Command: Leave as default (`npm run build` or `vite build`)
   - Output Directory: Leave as default (`dist`)

5. **Environment Variables**
   - Add all the required environment variables from your `.env` file
   - Make sure to add your Supabase URL and API keys
   - Add your Google Gemini API key

6. **Deploy**
   - Click 'Deploy'
   - Vercel will build and deploy your application
   - Once complete, you'll receive a URL for your deployed application

7. **Custom Domain (Optional)**
   - In your project settings on Vercel, go to 'Domains'
   - Add your custom domain and follow the instructions to set up DNS

8. **Continuous Deployment**
   - Vercel automatically sets up continuous deployment
   - Any new commits to your main branch will trigger a new deployment

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Parth Sharma

- Email: ksparth12@gmail.com
- LinkedIn: [ksparth128](https://www.linkedin.com/in/ksparth128/)
- GitHub: [ksparth12](https://github.com/ksparth12)
