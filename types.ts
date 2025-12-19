
export interface Prospect {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
}

export interface FormState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

// --- App Types ---

export type ViewState = 'DASHBOARD' | 'PROJECT_DETAIL' | 'SHEET_REVIEW' | 'UPLOAD';

export type StageStatus = 'PENDING' | 'IN_PROGRESS' | 'NEEDS_REVIEW' | 'READY' | 'COMPLETED';

export interface Stage {
  id: string;
  name: string;
  status: StageStatus;
  description: string;
  lastUpdated?: string;
  actionLabel?: string;
}

export interface Project {
  id: string;
  name: string;
  address: string;
  sheetCount: number;
  lastActive: string;
  thumbnailUrl?: string;
  progress: number;
  stages: Stage[];
}
