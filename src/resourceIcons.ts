// All SVG strings should use `currentColor` for their stroke (and optionally fill)
// properties. This allows them to inherit the `color` CSS property from their parent
// element, making them easy to style dynamically with CSS or JavaScript.
// I've also set default width/height to 24 for better icon sizing.

export const connectionCrystalSvg = `
  <svg width="24" height="24" viewBox="0 0 132 176" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="34.2422" y1="36.6525" x2="65.2422" y2="0.652524" stroke="currentColor" stroke-width="2"/>
    <line x1="64.7578" y1="0.652523" x2="95.7578" y2="36.6525" stroke="currentColor" stroke-width="2"/>
    <line x1="35.6529" y1="36.5476" x2="64.6529" y2="61.5476" stroke="currentColor" stroke-width="2"/>
    <line x1="65.3471" y1="61.5476" x2="94.3471" y2="36.5476" stroke="currentColor" stroke-width="2"/>
    <line x1="65" y1="62.305" x2="65" y2="1.30505" stroke="currentColor" stroke-width="2"/>
    <line x1="35" y1="36.305" x2="95" y2="36.305" stroke="currentColor" stroke-width="2"/>
    <line x1="33" y1="65.305" x2="33" y2="108.305" stroke="currentColor" stroke-width="2"/>
    <line x1="32.9076" y1="107.885" x2="63.9076" y2="174.885" stroke="currentColor" stroke-width="2"/>
    <line x1="67.0924" y1="174.885" x2="98.0924" y2="107.885" stroke="currentColor" stroke-width="2"/>
    <line x1="98" y1="108.305" x2="98" y2="65.305" stroke="currentColor" stroke-width="2"/>
    <line x1="97" y1="64.305" x2="132" y2="64.305" stroke="currentColor" stroke-width="2"/>
    <line x1="131" y1="65.305" x2="131" y2="117.305" stroke="currentColor" stroke-width="2"/>
    <line x1="130.447" y1="117.199" x2="82.4472" y2="141.199" stroke="currentColor" stroke-width="2"/>
    <line x1="32" y1="66.305" y2="66.305" stroke="currentColor" stroke-width="2"/>
    <line x1="1" y1="65.305" x2="1" y2="117.305" stroke="currentColor" stroke-width="2"/>
    <line x1="0.461934" y1="116.418" x2="48.4619" y2="141.418" stroke="currentColor" stroke-width="2"/>
    <line x1="33.3168" y1="95.0353" x2="2.31684" y2="66.0353" stroke="currentColor" stroke-width="2"/>
    <line x1="98.3046" y1="94.5864" x2="129.305" y2="64.5864" stroke="currentColor" stroke-width="2"/>
    <line x1="98.2707" y1="107.342" x2="130.271" y2="116.342" stroke="currentColor" stroke-width="2"/>
    <line x1="33.2707" y1="108.268" x2="1.27075" y2="117.268" stroke="currentColor" stroke-width="2"/>
    <line x1="63" y1="174.305" x2="68" y2="174.305" stroke="currentColor" stroke-width="2"/>
  </svg>`;

// Placeholder SVGs for other resources. You can replace these with your custom designs!
// I'm using some generic Lucide icons for demonstration.
export const nexusNodeSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-git-fork"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg>`;
export const masteryScrollSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text"><path d="M21 8a2 2 0 0 0-2-2h-4.34a2 2 0 0 1-1.41-.58L9.7 3.7c-.94-.94-2.2-.94-3.14 0A2 2 0 0 0 5 4.34V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M12 11h4"/><path d="M12 15h4"/></svg>`;
export const insightPrismSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon"><path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z"/></svg>`;
export const reflectiveEssenceSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-droplet"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0z"/></svg>`;
export const amplificationCrystalSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="M18 3a3 3 0 0 0-3 3c0 1 .4 2 1 3l2 3l2-3c.6-1 1-2 1-3a3 3 0 0 0-3-3z"/><path d="M11.5 12.5L16 17l4.5-4.5"/><path d="M15 22l-1.5-1.5L9 16l-4.5 4.5"/><path d="M2 8l.7-2.7L5 4l2.3.7L8 2l-.7 2.7L5 6l-2.3-.7L2 8z"/></svg>`;
export const creativeCatalystSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5c.8.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="M11 17h2"/><path d="M12 6V2"/></svg>`;
export const precisionLensSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7s10 7 10 7s-3 7-10 7s-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;


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
