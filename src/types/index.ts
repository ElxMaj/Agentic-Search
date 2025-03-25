
export interface MockQueryData {
  query: string;
  interpretation: {
    steps: {
      description: string;
    }[];
  };
  resolutionPaths: {
    [key: string]: {
      name: string;
      icon: string;
      steps?: {
        description: string;
      }[];
      sources?: Source[];
    };
  };
}

export interface Source {
  type: string;
  title: string;
  date: string;
  metadata?: string;
  confidence: number;
  excerpt?: string;
}

export interface ResolutionPathOption {
  key: string;
  name: string;
  icon: string;
  description: string;
  confidence: number;
  sources: number;
  detail?: string;
}

export interface ConversationItem {
  id: string;
  query: string;
  answer: string;
  isActive: boolean;
}
