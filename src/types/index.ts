
import { Source } from '../data/mockData';

export interface ResolutionPathOption {
  key: string;
  name: string;
  icon: string;
  description: string;
  confidence: number;
  sources: number;
  detail: string;
}

export interface MockQueryData {
  query: string;
  interpretation: {
    steps: {
      description: string;
      entities?: {
        text: string;
        type: string;
      }[];
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

export interface ConversationItem {
  id: string;
  query: string;
  answer: React.ReactNode;
  isActive: boolean;
}
