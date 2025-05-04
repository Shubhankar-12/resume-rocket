export interface StatsType {
  name: string;
  githubProfile?: GithubProfile;
  avatar?: {
    url: string;
    name: string;
    mimetype: string;
  };
  provider?: string;
  user_resumes?: UserResumes;
  cover_letters?: CoverLetters;
  user_id: string;
}

export interface CoverLetters {
  resume_id: string;
  user_id: string;
  role: string;
  company: string;
  job_description: string;
  created_on: Date;
  updated_on: Date;
  cover_letter_id: string;
}

export interface GithubProfile {
  githubId: string;
  username: string;
  profileUrl: string;
  reposUrl: string;
}

export interface UserResumes {
  analysis: Analysis;
  status: string;
  resume: Resume;
  created_on: Date;
  updated_on: Date;
  user_resume_id: string;
}

export interface Analysis {
  suggestions: {
    title: string;
    description: string;
  }[];
  gradingScore: number;
  atsScore: number;
}

export interface Resume {
  url: string;
  name: string;
  mimetype: string;
}
