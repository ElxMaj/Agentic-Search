
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

/**
 * Creates a badge with a background color based on status
 * @param text The text to display in the badge
 * @param status The status (on, off, warning, etc.)
 * @returns HTML string with the formatted badge
 */
export function createStatusBadge(text: string, status: string = "default"): string {
  let colorClass = "bg-gray-100 text-gray-800";
  
  switch (status.toLowerCase()) {
    case "on":
    case "active":
    case "enabled":
      colorClass = "bg-green-100 text-green-800";
      break;
    case "off":
    case "inactive":
    case "disabled":
      colorClass = "bg-red-100 text-red-800";
      break;
    case "warning":
    case "caution":
      colorClass = "bg-yellow-100 text-yellow-800";
      break;
    case "info":
    case "note":
      colorClass = "bg-blue-100 text-blue-800";
      break;
  }
  
  return `<span class="${colorClass} px-1.5 py-0.5 rounded">${text}</span>`;
}

/**
 * Creates a pro tip box with consistent styling
 * @param content The tip content
 * @returns HTML string with the formatted tip box
 */
export function createProTip(content: string): string {
  return `
    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
      <p class="text-gray-700"><span class="font-medium">Pro tip:</span> ${content}</p>
    </div>
  `;
}

/**
 * Creates a warning box with consistent styling
 * @param content The warning content
 * @param type The type of warning (caution, important, etc.)
 * @returns HTML string with the formatted warning box
 */
export function createWarningBox(content: string, type: string = "Important"): string {
  return `
    <div class="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-sm">
      <p class="text-yellow-800"><span class="font-medium">⚠️ ${type}:</span> ${content}</p>
    </div>
  `;
}

/**
 * Creates a success/tip box with consistent styling
 * @param content The success/tip content
 * @returns HTML string with the formatted success box
 */
export function createSuccessBox(content: string): string {
  return `
    <div class="bg-green-50 p-3 rounded-lg border border-green-200 text-sm">
      <p class="text-green-800"><span class="font-medium">💡 Pro tip:</span> ${content}</p>
    </div>
  `;
}

/**
 * Formats a numbered or bulleted list
 * @param items Array of list items
 * @param type Type of list (ordered or unordered)
 * @returns HTML string with the formatted list
 */
export function formatList(items: string[], type: 'ordered' | 'unordered' = 'ordered'): string {
  const tag = type === 'ordered' ? 'ol' : 'ul';
  const classList = type === 'ordered' ? 'list-decimal' : 'list-disc';
  
  return `
    <${tag} class="${classList} pl-5 space-y-2">
      ${items.map(item => `<li>${item}</li>`).join('')}
    </${tag}>
  `;
}

/**
 * Formats a keyboard shortcut with consistent styling
 * @param keys Array of key names
 * @returns HTML string with the formatted keyboard shortcut
 */
export function formatKeyboardShortcut(keys: string[]): string {
  return keys.map(key => `<kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">${key}</kbd>`).join('+');
}

