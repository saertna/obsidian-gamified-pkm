const connectionCrystalSvg = `
  <svg width="132" height="176" viewBox="0 0 132 176" fill="none" xmlns="http://www.w3.org/2000/svg">
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
</svg>`; // Renamed for clarity and consistency

// Also, changed all `stroke="black"` to `stroke="currentColor"` in the SVG.
// This is a best practice for SVGs used as icons, as it allows their color to be inherited
// from the CSS `color` property of their parent, making them easier to style.

export function createResourceIcon(containerEl: HTMLElement, resourceName: string, resourceTitle: string, svgContent: string) {
	const iconWrapper = containerEl.createDiv({ cls: 'gamified-pkm-resource-icon' });

	// Set the innerHTML directly to embed the SVG
	iconWrapper.innerHTML = svgContent; // Use the passed svgContent

	// Set the title attribute for a tooltip, using the resourceTitle value
	iconWrapper.setAttribute('title', `Resource: ${resourceTitle}`);

	// Example of dynamic styling (e.g., color based on resource type)
	// This will now apply to elements where stroke="currentColor" is used.
	if (resourceName === 'connectionCrystalSvg') {
		iconWrapper.style.color = 'yellow'; // Set the color property of the wrapper
	} else if (resourceName === 'precisionLens') {
		iconWrapper.style.color = 'blue'; // Set the color property of the wrapper
	}

	return iconWrapper;
}

// How to use it in your plugin:
// Imagine you have a container element in your UI, e.g., a modal's contentEl or a sidebar panel.
// In your main plugin class or a view class:
// const myContainer = this.contentEl; // Or this.view.containerEl, etc.
// createResourceIcon(myContainer, 'connectionCrystal', 'Connection Crystal', connectionCrystalSvg);
