# ResumeRocket ✨

> Your AI-powered career acceleration platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black)](https://nextjs.org/)

ResumeRocket is a comprehensive, AI-powered platform that helps job seekers optimize their application materials through intelligent resume analysis, tailoring, and cover letter generation. It also provides GitHub project evaluation to showcase your best work to potential employers.

![ResumeRocket Dashboard Preview](https://placehold.co/1200x600?text=ResumeRocket+Dashboard)

## ✨ Key Features

### Resume Management & Optimization

- **Smart Resume Analysis** - AI-driven assessment of format, content, and impact
- **Resume Grading** - Detailed scoring with actionable improvement suggestions
- **Job-Specific Tailoring** - Custom-fit your resume to any job description
- **Multiple Export Formats** - ATS-friendly and visually appealing options

### Cover Letter Generation

- **AI-Powered Writing** - Create compelling, personalized cover letters
- **Job Description Integration** - Ensures perfect alignment with the role
- **Easy Editing & Customization** - Fine-tune the AI's output to your voice

### GitHub Portfolio Analysis

- **Repository Evaluation** - Identify your most impressive projects
- **Technical Skill Mapping** - Match your coding skills to job requirements
- **Presentation Optimization** - Showcase your work in the best possible light

### Document Management

- **Centralized Storage** - Keep all application materials in one place
- **Version Control** - Track changes and improvements over time
- **Quick Export** - Generate professional PDFs for immediate application

## 🛠️ Technology Stack

### Backend [resume-rocket-backend](https://github.com/Shubhankar-12/resume-grader-user-management)

- **Runtime & Framework**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with secure cookie storage
- **Storage**: AWS S3 for document management
- **AI Integration**: OpenAI API for intelligent analysis
- **API Architecture**: RESTful design principles

### Frontend

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios with interceptors
- **PDF Generation**: Puppeteer and pdf-lib
- **Custom Utilities**: Advanced hooks for loading states and PDF exports

## 📊 Dashboard & Analytics

- Personal improvement metrics
- Application success tracking
- Skills gap analysis
- Industry-specific benchmarking

## 🔒 Security Features

- Secure authentication with JWT
- GitHub OAuth integration
- Document encryption
- GDPR-compliant data handling
- Rate limiting and abuse prevention

## 📱 User Interface

| Section             | Description                                                           |
| ------------------- | --------------------------------------------------------------------- |
| Dashboard           | Overview of your career profile, recent activities, and quick actions |
| Resume Lab          | Upload, analyze, and optimize your resumes                            |
| Cover Letter Studio | Create and manage personalized cover letters                          |
| GitHub Analyzer     | Connect, select, and enhance your GitHub projects                     |
| Settings            | Manage your profile, connections, and preferences                     |

## 📂 Project Structure

```
📦 ResumeRocket
 ┣ 📂 backend
 ┃ ┣ 📂 controllers    # Request handlers
 ┃ ┣ 📂 models         # Database schemas
 ┃ ┣ 📂 routes         # API endpoints
 ┃ ┣ 📂 services       # Business logic & external APIs
 ┃ ┣ 📂 middleware     # Auth, validation, error handling
 ┃ ┣ 📂 utils          # Helper functions
 ┃ ┣ 📂 config         # Environment configuration
 ┃ ┗ 📜 index.ts       # Entry point
 ┃
 ┣ 📂 frontend
 ┃ ┣ 📂 app            # Next.js App Router pages
 ┃ ┣ 📂 components     # UI components
 ┃ ┃ ┣ 📂 ui           # Core UI elements
 ┃ ┃ ┣ 📂 dashboard    # Dashboard-specific components
 ┃ ┃ ┣ 📂 resume       # Resume-related components
 ┃ ┃ ┣ 📂 cover-letter # Cover letter components
 ┃ ┃ ┗ 📂 github       # GitHub analysis components
 ┃ ┣ 📂 hooks          # Custom React hooks
 ┃ ┣ 📂 redux          # State management
 ┃ ┣ 📂 services       # API communication
 ┃ ┣ 📂 styles         # Global styles
 ┃ ┣ 📂 utils          # Utility functions
 ┃ ┗ 📂 public         # Static assets
 ┃
 ┣ 📂 docs             # Documentation
 ┣ 📂 scripts          # Build and deployment scripts
 ┗ 📜 README.md        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB instance
- OpenAI API key
- GitHub OAuth credentials (for GitHub integration)
- AWS S3 bucket (for file storage)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/ResumeRocket.git
cd ResumeRocket/backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 🔄 Continuous Integration

This project uses GitHub Actions for CI/CD:

- Automated testing
- Code quality checks
- Deployment to staging/production

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<p align="center">
  Made with ❤️ for job seekers everywhere
</p>
