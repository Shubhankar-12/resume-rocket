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
