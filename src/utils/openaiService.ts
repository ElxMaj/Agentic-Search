
import { Source } from '../data/mockData';

// Define response interfaces
interface QueryInterpretationStep {
  description: string;
  entities?: { text: string; type: string }[];
}

interface QueryInterpretation {
  steps: QueryInterpretationStep[];
}

interface ResolutionPath {
  name: string;
  icon: string;
  steps?: string[];
  sources?: Source[];
}

interface OpenAIResponse {
  interpretation: QueryInterpretation;
  resolutionPaths: Record<string, ResolutionPath>;
}

export async function getOpenAIResponse(query: string): Promise<OpenAIResponse> {
  try {
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides technical support for Dell and Logitech products. Respond in a structured format with query interpretation and resolution paths.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 1200,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Parse the OpenAI response content into our expected format
    const content = JSON.parse(data.choices[0].message.content) as any;
    
    // Transform the API response into our application's format
    return transformOpenAIResponse(content, query);
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    throw error;
  }
}

// Helper function to transform OpenAI's response to match our application's format
function transformOpenAIResponse(apiResponse: any, query: string): OpenAIResponse {
  // Default structure if API response is malformed
  const defaultResponse: OpenAIResponse = {
    interpretation: {
      steps: [
        {
          description: `I'll help you with your query about "${query}".`,
          entities: [{ text: query, type: 'QUERY' }]
        }
      ]
    },
    resolutionPaths: {
      'general': {
        name: 'General Information',
        icon: '💡',
        steps: ['Here is some information that might help you.']
      }
    }
  };

  try {
    // Extract and transform the data accordingly
    // This is a simplified implementation - you'll need to adjust based on your actual API response structure
    return {
      interpretation: apiResponse.interpretation || defaultResponse.interpretation,
      resolutionPaths: apiResponse.resolutionPaths || defaultResponse.resolutionPaths
    };
  } catch (error) {
    console.error('Error transforming OpenAI response:', error);
    return defaultResponse;
  }
}

// Function to set the OpenAI API key
export function setOpenAIApiKey(apiKey: string): void {
  localStorage.setItem('openai_api_key', apiKey);
}

// Function to check if the OpenAI API key is set
export function hasOpenAIApiKey(): boolean {
  return !!localStorage.getItem('openai_api_key');
}
