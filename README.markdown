# 🧠 Vibe Check

An AI-powered quiz platform that lets you create engaging quizzes instantly, uncover personality insights, and share with friends. Whether you're testing knowledge or exploring vibes, Vibe Check makes learning and self-discovery fun and interactive.

*Live Demo:* [https://role-1-vibe-check.vercel.app/](https://role-1-vibe-check.vercel.app/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-blue)](https://clerk.com/)

## ✨ Features

- **🪄 AI-Powered Quiz Generation**: Create quizzes on any topic in seconds using Google Gemini Flash 2.0, with customizable question counts and difficulty levels.
- **🧠 Personality Vibe Analysis**: Discover AI-driven insights into your personality or preferences through vibe check quizzes, revealing unique traits based on your answers.
- **🔒 Secure Authentication**: Enterprise-grade user authentication and authorization powered by Clerk for safe, seamless access.
- **🚀 Modern & Animated UI**: Sleek, responsive interface built with Radix UI, Tailwind CSS, and Framer Motion for smooth animations and accessibility.
- **📊 Quiz Management Dashboard**: View, manage, and track your quizzes with detailed statistics, attempt history, and sharing options.
- **📱 Mobile-First Design**: Fully responsive layouts optimized for desktops, tablets, and smartphones.
- **🔄 Real-Time Updates**: Supabase’s real-time database ensures instant updates for quiz creation and submissions.
- **🌐 Shareable Quizzes**: Share quizzes with friends or the public via unique, customizable links.
- **📈 Analytics**: Track quiz performance and user engagement with built-in analytics.

## 📋 Quiz Types

1. **Scored Quiz**: Traditional multiple-choice quizzes with correct and incorrect answers, ideal for testing knowledge.
2. **Vibe Check (Personality Quiz)**: Opinion-based quizzes that analyze answers to provide personalized personality or preference insights.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (React framework with App Router)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Clerk](https://clerk.com/) for secure user management
- **Database**: [Supabase](https://supabase.com/) with PostgreSQL and Row-Level Security (RLS)
- **AI Integration**: [Google Gemini Flash 2.0](https://cloud.google.com/gemini) for quiz generation and vibe analysis
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for dynamic transitions
- **Deployment**: [Vercel](https://vercel.com/) for seamless hosting and CI/CD
- **Type Safety**: TypeScript for robust development
- **Linting & Formatting**: ESLint and Prettier for code quality

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm** or **yarn**: Package manager for dependencies
- **Supabase Account**: For database setup ([Sign up](https://supabase.com/))
- **Clerk Account**: For authentication ([Sign up](https://clerk.com/))
- **Google Gemini API Key**: For AI quiz generation ([Get a key](https://cloud.google.com/gemini))

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ayush7662/Role-1--vibe-check.git
   cd vibe-check
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the project root and add the following:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key

   # Google Gemini API
   GOOGLE_GEMINI_API_KEY=your-gemini-api-key

   # Next.js
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
   - **Supabase**: Find your project URL and anon key in the Supabase dashboard under **Settings > API**.
   - **Clerk**: Get your keys from the Clerk dashboard under **API Keys**.
   - **Gemini API**: Obtain your API key from the Google Cloud Console.

4. **Set Up Supabase Database**:
   Run the SQL schema provided in the [Database Setup](#database-setup) section in the Supabase SQL Editor to create the required tables and enable RLS.

5. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

6. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## 🌐 Deployment

To deploy Vibe Check to Vercel:

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel via the Vercel dashboard.
3. Add the environment variables from `.env.local` in Vercel’s **Settings > Environment Variables**.
4. Deploy the app. Vercel will handle the Next.js build and deployment automatically.


## 📜 License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.

## 🧑‍💻 Author

**Ayush Raj**

- GitHub: [github.com/ayush7662](https://github.com/ayush7662)
- Email: [kamalayush65@gmail.com](mailto:kamalayush65@gmail.com)

## 🙌 Acknowledgments

- [Next.js](https://nextjs.org/) for a powerful framework
- [Supabase](https://supabase.com/) for an open-source database
- [Clerk](https://clerk.com/) for seamless authentication
- [Google Gemini](https://cloud.google.com/gemini) for AI capabilities
- [Vercel](https://vercel.com/) for effortless deployment

---

**Ready to vibe?** Create your first quiz and discover your personality today with Vibe Check! 🎉
