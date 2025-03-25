
export interface MockQueryData {
  query: string;
  interpretation: {
    steps: InterpretationStep[];
  };
  resolutionPaths: {
    [key: string]: {
      name: string;
      icon: string;
      steps?: InterpretationStep[];
      sources?: Source[];
    };
  };
}

export interface InterpretationStep {
  description: string;
  entities?: Entity[];
}

export interface Entity {
  text: string;
  type: string;
}

export interface Source {
  type: "official" | "community" | "knowledge-base";
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
