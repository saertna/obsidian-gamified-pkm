import { App, Modal } from 'obsidian';
import { GamificationMediatorImpl } from './GamificationMediatorImpl';
import { MultiSelectModal } from './MultiSelectModal';

const craftingIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.07-.75-1.66-1.04l-.35-2.61c-.04-.24-.25-.42-.5-.42h-4c-.25 0-.46.18-.5.42l-.35 2.61c-.59.29-1.14.64-1.66 1.04l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.12.22-.07.49.12.64l2.11 1.65c-.04.32-.07.64-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.07.75 1.66 1.04l.35 2.61c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.35-2.61c.59-.29 1.14-.64 1.66-1.04l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-7.43-1.98c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
  </svg>
`; // Example: A gear icon

const boosterIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 15h2v-3h3v-2h-3V7h-2v3H8v2h3zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>
`; // Example: A plus-in-circle icon (common for buffs/boosts)

export class ModalBooster extends Modal {
	private readonly displayText: string;
	private readonly mediator: GamificationMediatorImpl;

	constructor(app: App, displayText: string, mediator: GamificationMediatorImpl) {
		super(app);
		this.displayText = displayText;
		this.mediator = mediator;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty(); // Clear any existing content

		const modalHeader = contentEl.createDiv({ cls: 'modal-hub-header' });
		modalHeader.createEl('h2', { text: 'Gamified PKM Adventure', cls: 'modal-hub-title' });
		modalHeader.createEl('p', { text: 'Choose your path to power up!', cls: 'modal-hub-subtitle' });


		const multiSelectModal = new MultiSelectModal(this.app, [], 'Craft Booster Item', this.mediator);

		const choicesContainer = contentEl.createDiv({ cls: 'modal-choices-container' });

		const craftingCard = choicesContainer.createDiv({ cls: 'choice-card' });
		craftingCard.setAttribute('data-action', 'open-crafting'); // Useful for CSS targeting or JS

		const craftingIconHolder = craftingCard.createDiv({ cls: 'choice-card-icon' });
		craftingIconHolder.innerHTML = craftingIconSvg;
		craftingCard.createEl('h3', { text: 'Crafting Station', cls: 'choice-card-title' });

		craftingCard.onclick = () => {
			this.close(); // Close this modal
			multiSelectModal.setUseBooster(false);
			multiSelectModal.open();
		};

		const boosterCard = choicesContainer.createDiv({ cls: 'choice-card' });
		boosterCard.setAttribute('data-action', 'open-booster'); // Useful for CSS targeting or JS

		const boosterIconHolder = boosterCard.createDiv({ cls: 'choice-card-icon' });
		boosterIconHolder.innerHTML = boosterIconSvg;
		boosterCard.createEl('h3', { text: 'Booster Hub', cls: 'choice-card-title' });

		boosterCard.onclick = () => {
			this.close(); // Close this modal
			multiSelectModal.setUseBooster(true);
			multiSelectModal.open();
		};
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
