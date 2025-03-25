
type QueryCategory = 'hardware' | 'software' | 'troubleshooting' | 'general';

interface SuggestionSet {
  general: string[];
  specific: {
    hardware: string[];
    software: string[];
    troubleshooting: string[];
    general: string[];
  };
}

// These suggestions are designed to be topic-agnostic but context-aware
const followUpSuggestions: SuggestionSet = {
  // General suggestions that work for virtually any query
  general: [
    "What else should I check?",
    "How do I fix this if that didn't work?",
    "Is there a deeper issue I should know about?",
    "What's the most common cause of this problem?",
    "Is there a faster way to solve this?",
    "Are there any preventative steps I should take?",
    "What if the problem returns later?",
  ],
  
  // More specific suggestions based on query category
  specific: {
    hardware: [
      "Are there compatible alternatives?",
      "How do I check if my hardware is damaged?",
      "Does this require professional service?",
      "Will upgrading fix the issue permanently?",
      "Is this covered under warranty?",
    ],
    software: [
      "Is there a newer version available?",
      "Do I need to update any drivers?",
      "Will reinstalling fix the problem?",
      "Are there any known conflicts?",
      "How do I back up my data before making changes?",
    ],
    troubleshooting: [
      "What do the error codes mean?",
      "How can I diagnose this myself?",
      "Are there any quick fixes?",
      "What tools do I need for this repair?",
      "How long should this repair take?",
    ],
    general: [
      "Where can I find more information?",
      "Who should I contact for support?",
      "Is there a community forum for this issue?",
      "Are there any tutorials available?",
      "What should I do if nothing works?",
    ],
  },
};

export function categorizeQuery(query: string): QueryCategory {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('graphics') || 
      lowerQuery.includes('display') ||
      lowerQuery.includes('screen') ||
      lowerQuery.includes('battery') ||
      lowerQuery.includes('keyboard') ||
      lowerQuery.includes('webcam') ||
      lowerQuery.includes('camera') ||
      lowerQuery.includes('hardware')) {
    return 'hardware';
  }
  
  if (lowerQuery.includes('software') ||
      lowerQuery.includes('app') ||
      lowerQuery.includes('application') ||
      lowerQuery.includes('program') ||
      lowerQuery.includes('install') ||
      lowerQuery.includes('update') ||
      lowerQuery.includes('driver')) {
    return 'software';
  }
  
  if (lowerQuery.includes('slow') ||
      lowerQuery.includes('error') ||
      lowerQuery.includes('fix') ||
      lowerQuery.includes('problem') ||
      lowerQuery.includes('troubleshoot') ||
      lowerQuery.includes('not working') ||
      lowerQuery.includes('repair') ||
      lowerQuery.includes('broken')) {
    return 'troubleshooting';
  }
  
  return 'general';
}

export function generateFollowUpSuggestions(query: string, previousSuggestions: string[] = []): string[] {
  const category = categorizeQuery(query);
  
  // Start with category-specific suggestions
  let availableSuggestions = [...followUpSuggestions.specific[category]];
  
  // Add some general suggestions
  availableSuggestions = [...availableSuggestions, ...followUpSuggestions.general];
  
  // Filter out any previously used suggestions
  availableSuggestions = availableSuggestions.filter(
    suggestion => !previousSuggestions.includes(suggestion)
  );
  
  // Shuffle the array for randomness
  availableSuggestions.sort(() => Math.random() - 0.5);
  
  // Return only the first 3
  return availableSuggestions.slice(0, 3);
}
