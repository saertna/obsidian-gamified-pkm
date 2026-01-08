import { getResourceColor, resourceSvgMap } from '../data/resourceIcons'; // Adjust path
import { IngredientElement } from '../data/constants'; // Assuming this is where IngredientElement is defined

/**
 * Creates an HTMLElement containing an ingredient's icon, name, and quantity, styled for an Obsidian Notice.
 *
 * @param ingredient The IngredientElement object for the earned ingredient.
 * @param count The number of this particular ingredient earned.
 * @returns An HTMLElement suitable for display in an Obsidian Notice.
 */
export function createEarnedIngredientHtml(ingredient: IngredientElement, count: number): HTMLElement {
	const container = document.createElement('span');
	container.classList.add('gamified-pkm-notice-ingredient-wrapper');

	const svgContent = resourceSvgMap[ingredient.name];

	if(count>1){
		const countSpan = document.createElement('span');
		countSpan.classList.add('gamified-pkm-notice-name');
		countSpan.textContent = `${count}x `;
		container.appendChild(countSpan);
	}

	if (svgContent) {
		const iconHolder = document.createElement('span');
		iconHolder.classList.add('gamified-pkm-notice-icon');
		iconHolder.innerHTML = svgContent;
		iconHolder.style.color = getResourceColor(ingredient.name);
		container.appendChild(iconHolder);
	}

	const nameSpan = document.createElement('span');
	nameSpan.classList.add('gamified-pkm-notice-name');
	nameSpan.textContent = `${ingredient.name}`;
	container.appendChild(nameSpan);

	return container;
}
