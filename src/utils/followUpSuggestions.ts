
// Collection of generic follow-up suggestions that can work in most contexts
const genericFollowUps = [
  "What else should I check?",
  "How do I fix this if that didn't work?",
  "Is there a deeper issue?",
  "Are there any alternative solutions?",
  "What preventive steps should I take?",
  "Is there a faster way to solve this?",
  "What are common mistakes to avoid?",
  "Do I need professional help with this?",
  "How can I prevent this in the future?",
  "Are there any related issues I should know about?",
  "What should I do if the problem persists?",
  "Can you explain this in simpler terms?"
];

// Topic-specific follow-ups for different scenarios
const topicFollowUps: { [key: string]: string[] } = {
  webcam: [
    "Will this fix work for external webcams too?",
    "What if I have multiple webcams?",
    "Could this be related to my microphone issues?"
  ],
  graphics: [
    "How much will this improve gaming performance?",
    "Will this fix graphic glitches in videos?",
    "Does this affect battery life?"
  ],
  performance: [
    "How often should I perform these optimizations?",
    "Will adding more RAM help with this issue?",
    "Does this apply to SSD drives too?"
  ]
};

/**
 * Generates relevant follow-up suggestions based on the original query
 * @param query The original user query
 * @param usedSuggestions Array of previously used suggestions to avoid repetition
 * @returns Array of 3 relevant follow-up suggestions
 */
export const generateFollowUpSuggestions = (query: string, usedSuggestions: string[] = []): string[] => {
  // Normalize query for matching
  const normalizedQuery = query.toLowerCase();
  
  // Determine if query matches any of our specific topics
  let topicMatches: string[] = [];
  
  if (normalizedQuery.includes("webcam") || normalizedQuery.includes("camera") || normalizedQuery.includes("teams")) {
    topicMatches = topicFollowUps.webcam;
  } else if (normalizedQuery.includes("graphics") || normalizedQuery.includes("display") || normalizedQuery.includes("screen")) {
    topicMatches = topicFollowUps.graphics;
  } else if (normalizedQuery.includes("slow") || normalizedQuery.includes("performance") || normalizedQuery.includes("speed")) {
    topicMatches = topicFollowUps.performance;
  }
  
  // Filter out already used suggestions
  const availableGeneric = genericFollowUps.filter(suggestion => !usedSuggestions.includes(suggestion));
  const availableTopicMatches = topicMatches.filter(suggestion => !usedSuggestions.includes(suggestion));
  
  // Combine topic-specific and generic suggestions, prioritizing topic matches
  const combinedSuggestions = [...availableTopicMatches, ...availableGeneric];
  
  // Shuffle array to get random selection each time
  const shuffled = [...combinedSuggestions].sort(() => 0.5 - Math.random());
  
  // Return up to 3 suggestions
  return shuffled.slice(0, 3);
};
