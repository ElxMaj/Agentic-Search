
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

/**
 * Formats content into sections with consistent styling
 * @param content The raw content to format
 * @param title The section title
 * @param color The color theme (blue, green, red, etc.)
 * @param description Optional description text
 * @returns HTML string with formatted content
 */
export function formatContentSection(content: string, title: string, color: string = "blue", description?: string): string {
  return `
    <div class="bg-${color}-50 border-l-4 border-${color}-500 p-4 rounded-r">
      <h3 class="font-bold text-lg text-${color}-800">${title}</h3>
      ${description ? `<p class="text-${color}-700 mb-2">${description}</p>` : ''}
    </div>
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mt-3">
      ${content}
    </div>
  `;
}
