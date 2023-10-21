import { App, Modal } from 'obsidian';
import gamification from 'main';
import { MultiSelectModal } from 'MultiSelectModal';

export class ModalBooster extends Modal {
	private readonly displayText: string;
	private readonly gamificationInstance: gamification;

	constructor(app: App, displayText: string, gamificationInstance: gamification) {
		super(app);
		this.displayText = displayText;
		this.gamificationInstance = gamificationInstance;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText(this.displayText);

		const multiSelectModal = new MultiSelectModal(this.app, [], 'Craft Booster Item', this.gamificationInstance); // Create the modal instance


		// Add a button to open the multi-select modal
		const button = document.createElement('button');
		button.innerText = 'Open Crafting Table';
		button.onclick = () => {
			multiSelectModal.setUseBooster(false); // Set the flag for crafting table
			multiSelectModal.open();
		};


		multiSelectModal.readBoostersStock();
		multiSelectModal.readIngrementStock();


		const button2 = document.createElement('button');
		button2.innerText = 'Open Booster Board';
		button2.onclick = () => {
			multiSelectModal.setUseBooster(true);
			multiSelectModal.open();
		};

		contentEl.appendChild(button);
		contentEl.appendChild(button2);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}

}
