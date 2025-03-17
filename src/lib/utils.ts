
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates an anchor tag with an external link icon
 * @param url The URL to link to
 * @param text The display text (defaults to the URL if not provided)
 * @param className Optional additional CSS classes
 * @returns HTML string with the formatted link
 */
export function createExternalLink(url: string, text?: string, className?: string): string {
  const displayText = text || url;
  const cssClass = className || "text-blue-600 hover:underline inline-flex items-center";
  
  return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${cssClass}">${displayText}<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;
}
