export interface Resume {
  id: string;
  title: string;
  lastModified: string;
  score: number;
  atsScore: number;
  tags: string[];
  versions: number;
  content: ResumeContent;
}

interface ResumeContent {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
  }[];
  skills: string[];
}

export interface ResumeData {
  analysis: Analysis;
  status: string;
  user_id: string;
  resume: ResumeClass;
  extractedText: string;
  created_on: Date;
  updated_on: Date;
  extracted_resume: ExtractedResume;
  resume_id: string;
}

export interface Analysis {
  suggestions: string[];
  gradingScore: number;
  atsScore: number;
}

export interface ExtractedResume {
  _id: string;
  skills: string[];
  status: string;
  summary: string;
  resume_id: string;
  category: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: Experience[];
  education: Education[];
  created_on: Date;
  updated_on: Date;
  __v: number;
}

export interface Experience {
  tasks: string[];
  _id: string;
  companyName: string;
  role: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  location: string;
  description: string;
}

export interface ResumeClass {
  url: string;
  name: string;
  mimetype: string;
}

export interface Education {
  schoolName: string;
  degree: string;
  subject: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface ProjectAnalysis {
  strengths: AnalysisItem[];
  areasForImprovement: AnalysisItem[];
}

export interface CertificationAnalysis {
  strengths: AnalysisItem[];
  areasForImprovement: AnalysisItem[];
  recommendedCertifications: string[];
}
export interface AnalysisItem {
  title: string;
  description: string;
}

export interface InterestAnalysis {
  relevance: number;
  comments: string;
  suggestions: string[];
}

export interface ReportType {
  report_id: string;
  resume_id: string;
  overallGrade: string;
  scoreOutOf100: number;
  scoreBreakdown: ScoreBreakdown;
  strengths: ActionableSuggestion[];
  areasForImprovement: ActionableSuggestion[];
  keywordAnalysis: KeywordAnalysis;
  actionableSuggestions: ActionableSuggestion[];
  projectAnalysis: ProjectAnalysis;
  certificationAnalysis: CertificationAnalysis;
  interestAnalysis: InterestAnalysis;
  status: string;
  created_on: Date;
  updated_on: Date;
}

export interface ActionableSuggestion {
  _id: string;
  title: string;
  description: string;
  block?: string;
}

export interface KeywordAnalysis {
  presentKeywords: string[];
  missingKeywords: string[];
}

export interface ScoreBreakdown {
  atsCompatibility: number;
  keywordMatch: number;
  contentQuality: number;
  formatting: number;
}

export interface AnalysisItem {
  resume_id: string;
  job_description: string;
  keyRequirements: {
    requiredSkills: string[];
    experienceLevel: string;
    education: string;
    keyResponsibilities: string[];
  };
  resumeMatchAnalysis: {
    overallMatch: number;
    matchingSkills: string[];
    missingSkills: string[];
    experienceMatch: {
      isMatching: boolean;
      message: string;
    };
    educationMatch: {
      isMatching: boolean;
      message: string;
    };
    projectsMatch: {
      isMatching: boolean;
      message: string;
      relevantProjects: string[];
    };
    certificationMatch: {
      isMatching: boolean;
      message: string;
      relevantCertifications: string[];
      recommendedCertifications: string[];
    };
  };
}

export interface TailoredResumeData {
  user_id: string;
  resume_id: string;
  tailored_resume_id: string;
  job_description: string;
  category: string;
  name: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: {
    _id: string;
    companyName: string;
    role: string;
    startDate: string;
    endDate: string;
    isPresent: boolean;
    location: string;
    description: string;
    tasks: string[];
  }[];
  education: {
    _id: string;
    schoolName: string;
    degree: string;
    subject: string;
    location: string;
    startDate: string;
    endDate: string;
  }[];
  projects: {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies: string[];
    links: {
      _id: string;
      [key: string]: string;
    }[];
  }[];
  certifications: {
    _id: string;
    name: string;
    issuer: string;
    date: string;
    url: string;
  }[];
  languages: string[];
  intrests: string[];
  status: string;
  created_on: string;
  updated_on: string;
}
