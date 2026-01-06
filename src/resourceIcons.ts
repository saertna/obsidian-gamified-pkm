// All SVG strings should use `currentColor` for their stroke (and optionally fill)
// properties. This allows them to inherit the `color` CSS property from their parent
// element, making them easy to style dynamically with CSS or JavaScript.
// I've also set default width/height to 24 for better icon sizing.

export const connectionCrystalSvg = `
  <svg width="24" height="24" viewBox="0 0 132 176" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="34.2422" y1="36.6525" x2="65.2422" y2="0.652524" stroke="currentColor" stroke-width="14.7"/>
    <line x1="64.7578" y1="0.652523" x2="95.7578" y2="36.6525" stroke="currentColor" stroke-width="14.7"/>
    <line x1="35.6529" y1="36.5476" x2="64.6529" y2="61.5476" stroke="currentColor" stroke-width="14.7"/>
    <line x1="65.3471" y1="61.5476" x2="94.3471" y2="36.5476" stroke="currentColor" stroke-width="14.7"/>
    <line x1="65" y1="62.305" x2="65" y2="1.30505" stroke="currentColor" stroke-width="14.7"/>
    <line x1="35" y1="36.305" x2="95" y2="36.305" stroke="currentColor" stroke-width="14.7"/>
    <line x1="33" y1="65.305" x2="33" y2="108.305" stroke="currentColor" stroke-width="14.7"/>
    <line x1="32.9076" y1="107.885" x2="63.9076" y2="174.885" stroke="currentColor" stroke-width="14.7"/>
    <line x1="67.0924" y1="174.885" x2="98.0924" y2="107.885" stroke="currentColor" stroke-width="14.7"/>
    <line x1="98" y1="108.305" x2="98" y2="65.305" stroke="currentColor" stroke-width="14.7"/>
    <line x1="97" y1="64.305" x2="132" y2="64.305" stroke="currentColor" stroke-width="14.7"/>
    <line x1="131" y1="65.305" x2="131" y2="117.305" stroke="currentColor" stroke-width="14.7"/>
    <line x1="130.447" y1="117.199" x2="82.4472" y2="141.199" stroke="currentColor" stroke-width="14.7"/>
    <line x1="32" y1="66.305" y2="66.305" stroke="currentColor" stroke-width="14.7"/>
    <line x1="1" y1="65.305" x2="1" y2="117.305" stroke="currentColor" stroke-width="14.7"/>
    <line x1="0.461934" y1="116.418" x2="48.4619" y2="141.418" stroke="currentColor" stroke-width="14.7"/>
    <line x1="33.3168" y1="95.0353" x2="2.31684" y2="66.0353" stroke="currentColor" stroke-width="14.7"/>
    <line x1="98.3046" y1="94.5864" x2="129.305" y2="64.5864" stroke="currentColor" stroke-width="14.7"/>
    <line x1="98.2707" y1="107.342" x2="130.271" y2="116.342" stroke="currentColor" stroke-width="14.7"/>
    <line x1="33.2707" y1="108.268" x2="1.27075" y2="117.268" stroke="currentColor" stroke-width="14.7"/>
    <line x1="63" y1="174.305" x2="68" y2="174.305" stroke="currentColor" stroke-width="14.7"/>
  </svg>`;

export const nexusNodeSvg = `<svg width="137" height="133" viewBox="0 0 137 133" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M65.42 130.087L1.78275 81.2657C0.882144 80.5748 0.736437 79.2737 1.4619 78.4007L65.1064 1.81006C65.8947 0.86148 67.3452 0.845456 68.1543 1.77639L134.708 78.3604C135.475 79.2432 135.324 80.5931 134.381 81.2849L67.8204 130.112C67.1035 130.638 66.1255 130.628 65.42 130.087Z" stroke="black" stroke-width="14.7"/>
<path d="M37.0527 109L37.5396 128.723C37.5793 130.328 39.3989 131.234 40.7041 130.299L66.458 111.842C67.1593 111.339 68.1038 111.343 68.801 111.851L94.0029 130.219C95.3155 131.175 97.1607 130.251 97.1807 128.627L97.423 109M37.0527 109L13.9563 110.782C12.5791 110.888 11.5114 109.6 11.8718 108.266L16.1329 92.5M37.0527 109L36.5341 88M37.0527 109H97.423M97.423 109L113.869 96.694C114.974 95.8671 116.565 96.3815 116.976 97.6987L120.246 108.16C120.669 109.516 119.584 110.869 118.168 110.75L97.423 109ZM97.423 109L97.6823 88M36.5341 88L17.1102 63.2456C16.5375 62.5157 16.542 61.4878 17.1209 60.7629L35.2996 38M36.5341 88L35.2996 38M35.2996 38L34.7087 14.0694C34.673 12.6244 36.1349 11.6199 37.4711 12.1713L65.3817 23.69C65.8634 23.8888 66.4036 23.8917 66.8875 23.6982L95.8533 12.1118C97.1769 11.5824 98.6135 12.5681 98.5959 13.9935L98.2996 38M35.2996 38L46.0326 24.7416C46.4123 24.2725 46.9835 24 47.587 24H85.2213C85.8004 24 86.351 24.251 86.7309 24.6881L98.2996 38M98.2996 38L97.6823 88M98.2996 38L118.023 60.7218C118.664 61.4596 118.677 62.552 118.056 63.3056L97.6823 88M15.3496 55.7476L13.0681 43.3623C12.8417 42.1333 13.7853 41 15.035 41H27.4202C29.1061 41 30.0357 42.9579 28.97 44.2643L18.8662 56.6495C17.7886 57.9704 15.6584 57.424 15.3496 55.7476ZM116.892 52.9522L118.689 43.3686C118.92 42.1377 117.975 41 116.723 41H106.54C104.822 41 103.904 43.0238 105.035 44.317L113.421 53.9006C114.52 55.157 116.584 54.5931 116.892 52.9522Z" stroke="black" stroke-width="14.7"/>
</svg>`;

export const masteryScrollSvg = `<svg width="250" height="250" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
  <style>
    /* Define your color palette based on a single input color */
    svg {
      /* This is your BASE INPUT COLOR, e.g., a blue */
      --diamond-base-color: currentColor;
      /* Define shades relative to the base */
      --diamond-lightest: color-mix(in srgb, var(--diamond-base-color) 20%, white 80%);
      --diamond-lighter: color-mix(in srgb, var(--diamond-base-color) 40%, white 60%);
      --diamond-medium: var(--diamond-base-color);
      --diamond-darker: color-mix(in srgb, var(--diamond-base-color) 80%, black 20%);
      --diamond-darkest: color-mix(in srgb, var(--diamond-base-color) 60%, black 40%);
      --diamond-star: white; /* Often stars are pure white regardless of base */
    }
    /* You can update --diamond-base-color via CSS or JS to change the entire scheme */
    /* Example: document.getElementById('myDiamondSvg').style.setProperty('--diamond-base-color', 'green'); */
  </style>

  <!-- Outer background shape (main body) -->
  <polygon points="..." fill="var(--diamond-medium)"/>

  <!-- Facets (assign based on their original brightness in the image) -->
  <polygon points="..." fill="var(--diamond-lighter)"/>
  <polygon points="..." fill="var(--diamond-darker)"/>
  <polygon points="..." fill="var(--diamond-lightest)"/>
  <polygon points="..." fill="var(--diamond-darkest)"/>

  <!-- Central Star -->
  <path d="..." fill="var(--diamond-star)"/>

</svg>`;
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
