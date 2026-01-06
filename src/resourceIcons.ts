// All SVG strings should use `currentColor` for their stroke (and optionally fill)
// properties. This allows them to inherit the `color` CSS property from their parent
// element, making them easy to style dynamically with CSS or JavaScript.
// I've also set default width/height to 24 for better icon sizing.

export const connectionCrystalSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2L6 8l6 14 6-14zm0 2.82L7.94 8l4 7.64 4-7.64z"/>
  <path d="M18 8L12 12V2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 8L12 12V2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const nexusNodeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 2v20M2 12h20M4.22 4.22l15.56 15.56M4.22 19.78l15.56-15.56"/>
</svg>
`;

export const masteryScrollSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M4 2v20l8-4 8 4V2z"/>
  <path d="M12 4L12 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="10" y="3" width="4" height="18" fill="white"/>
  <path d="M4 2v20l8-4 8 4V2z" fill="currentColor"/>
  <path d="M12 4v16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;
export const insightPrismSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <polygon points="12 2 2 10 2 14 12 22 22 14 22 10 12 2"/>
  <path d="M12 2L12 22M2 10L22 14" stroke="currentColor" stroke-width="1" fill="none"/>
  <path d="M22 10L2 14" stroke="currentColor" stroke-width="1" fill="none"/>
</svg>`;
export const reflectiveEssenceSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 3.31-2.69 6-6 6zm0-10V4c2.21 0 4 1.79 4 4h-2c0-1.1-.9-2-2-2z"/>
</svg>`;
export const amplificationCrystalSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2L6 8l6 14 6-14zm0 2.82L7.94 8l4 7.64 4-7.64z"/>
  <path d="M12 2L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 18L12 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 15h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 9h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
export const creativeCatalystSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <circle cx="12" cy="18" r="4"/> <!-- The 'energy' or 'catalyst' base -->
  <circle cx="12" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1"/> <!-- Inner core of activity -->
  <path d="M12 14v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/> <!-- The upward flow of catalyzed energy -->
  <path d="M9 9l3-3 3 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/> <!-- The 'new idea' bursting forth (arrowhead) -->
</svg>`;
export const precisionLensSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
</svg>`;


/**
 * Creates a DOM element that displays a resource icon and its quantity.
 * The icon's color can be dynamically set via the parent's `color` CSS property.
 *
 * @param containerEl The HTMLElement to append the resource display to.
 * @param resourceName The full name of the resource (e.g., 'Connection Crystal'). Used for title/tooltip.
 * @param quantity The number of this resource available.
 * @param svgContent The SVG string for the resource's icon.
 * @returns The created HTMLElement containing the icon and quantity.
 */
export function createResourceDisplay(containerEl: HTMLElement, resourceName: string, quantity: number, svgContent: string): HTMLElement {
	const wrapper = containerEl.createDiv({ cls: 'gamified-pkm-resource-item' });

	const iconHolder = wrapper.createDiv({ cls: 'gamified-pkm-resource-icon-holder' });
	iconHolder.innerHTML = svgContent;
	iconHolder.setAttribute('title', resourceName); // Tooltip on hover

	const quantitySpan = wrapper.createSpan({ text: `[${quantity}]`, cls: 'gamified-pkm-resource-quantity' });

	// Apply specific colors directly to the icon holder.
	// Since the SVG uses `currentColor`, this will automatically color the SVG.
	// Adjust these colors to fit your desired aesthetic for each resource!
	switch (resourceName) {
		case 'Connection Crystal':
			iconHolder.style.color = '#00CED1'; // Dark Turquoise
			break;
		case 'Nexus Node':
			iconHolder.style.color = '#8A2BE2'; // Blue Violet
			break;
		case 'Mastery Scroll':
			iconHolder.style.color = '#FFD700'; // Gold
			break;
		case 'Insight Prism':
			iconHolder.style.color = '#FF6347'; // Tomato
			break;
		case 'Reflective Essence':
			iconHolder.style.color = '#ADD8E6'; // Light Blue
			break;
		case 'Amplification Crystal':
			iconHolder.style.color = '#EE82EE'; // Violet
			break;
		case 'Creative Catalyst':
			iconHolder.style.color = '#32CD32'; // Lime Green
			break;
		case 'Precision Lens':
			iconHolder.style.color = '#6A5ACD'; // Slate Blue
			break;
		// Add more cases for other resources
	}

	return wrapper;
}
