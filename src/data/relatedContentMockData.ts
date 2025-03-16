
import { RelatedContentItem } from '../components/RelatedContent';

// Mock data for Dell graphics performance
export const dellGraphicsRelatedContent: RelatedContentItem[] = [
  {
    id: 'doc-1',
    title: 'Dell GPU Driver Update Guide',
    type: 'document',
    description: 'Comprehensive guide for updating graphics drivers on Dell systems with step-by-step instructions',
    url: '#',
    source: 'Dell Support',
    date: '2023-05-12'
  },
  {
    id: 'vid-1',
    title: 'How to Optimize NVIDIA Settings',
    type: 'video',
    description: 'Video tutorial showing how to configure NVIDIA Control Panel for optimal gaming performance',
    url: '#',
    source: 'Tech Support Solutions',
    date: '2023-08-21'
  },
  {
    id: 'link-1',
    title: 'GPU Benchmark Tools Comparison',
    type: 'link',
    description: 'Review of the top GPU benchmarking tools to test your graphics performance improvements',
    url: '#',
    source: 'TechRadar',
    date: '2023-11-05'
  },
  {
    id: 'doc-2',
    title: 'Thermal Management for Gaming Laptops',
    type: 'document',
    description: 'Learn how cooling affects GPU performance and how to improve thermal management',
    url: '#',
    source: 'Dell Gaming',
    date: '2023-07-18'
  },
  {
    id: 'vid-2',
    title: 'Upgrading Dell XPS Graphics Card',
    type: 'video',
    description: 'Step-by-step video guide for upgrading compatible Dell systems with better graphics cards',
    url: '#',
    source: 'PC Builder Channel',
    date: '2023-09-30'
  },
  {
    id: 'link-2',
    title: 'Graphics Performance Troubleshooting Forum',
    type: 'link',
    description: 'Community forum dedicated to solving Dell graphics performance issues',
    url: '#',
    source: 'Dell Community',
    date: '2023-10-15'
  }
];

// Mock data for Logitech webcam
export const logitechWebcamRelatedContent: RelatedContentItem[] = [
  {
    id: 'doc-1',
    title: 'Logitech C920 Complete Setup Guide',
    type: 'document',
    description: 'Official documentation for setting up and optimizing your Logitech C920 webcam',
    url: '#',
    source: 'Logitech Support',
    date: '2023-06-10'
  },
  {
    id: 'vid-1',
    title: 'Webcam Lighting Tips for Video Calls',
    type: 'video',
    description: 'Professional tips for improving webcam video quality with proper lighting techniques',
    url: '#',
    source: 'Stream Setup Guide',
    date: '2023-08-05'
  },
  {
    id: 'link-1',
    title: 'Best Webcam Software Comparison',
    type: 'link',
    description: 'Review of third-party software options to enhance your Logitech webcam functionality',
    url: '#',
    source: 'TechReview',
    date: '2023-09-22'
  },
  {
    id: 'doc-2',
    title: 'Logitech Webcam Troubleshooting Guide',
    type: 'document',
    description: 'Solutions for common webcam issues including driver problems and connectivity issues',
    url: '#',
    source: 'Logitech Support',
    date: '2023-07-30'
  },
  {
    id: 'vid-2',
    title: 'Logitech Webcam for Remote Work Setup',
    type: 'video',
    description: 'Complete guide to setting up your home office with optimal webcam configuration',
    url: '#',
    source: 'Work From Home Channel',
    date: '2023-10-12'
  },
  {
    id: 'link-2',
    title: 'Webcam Privacy and Security Best Practices',
    type: 'link',
    description: 'Learn how to secure your webcam and protect your privacy during video calls',
    url: '#',
    source: 'Digital Privacy Guide',
    date: '2023-11-08'
  }
];

// Generic related content for other queries
export const genericRelatedContent: RelatedContentItem[] = [
  {
    id: 'doc-1',
    title: 'Comprehensive Troubleshooting Guide',
    type: 'document',
    description: 'Step-by-step solutions for common technical issues with detailed explanations',
    url: '#',
    source: 'Tech Support Central',
    date: '2023-08-15'
  },
  {
    id: 'vid-1',
    title: 'Product Setup Video Tutorial',
    type: 'video',
    description: 'Visual guide showing how to properly set up and configure your device',
    url: '#',
    source: 'Tech Tutorials',
    date: '2023-09-10'
  },
  {
    id: 'link-1',
    title: 'Community Support Forum',
    type: 'link',
    description: 'Connect with other users to share tips and solutions for common problems',
    url: '#',
    source: 'User Community',
    date: '2023-10-20'
  }
];

// Function to get related content based on query
export const getRelatedContentForQuery = (query: string): RelatedContentItem[] => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('dell') && (lowerQuery.includes('graphics') || lowerQuery.includes('gpu'))) {
    return dellGraphicsRelatedContent;
  }
  
  if (lowerQuery.includes('logitech') && lowerQuery.includes('webcam')) {
    return logitechWebcamRelatedContent;
  }
  
  return genericRelatedContent;
};
