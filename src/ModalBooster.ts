import { App, Modal } from 'obsidian';
import { GamificationMediatorImpl } from './GamificationMediatorImpl';
import { MultiSelectModal } from './MultiSelectModal';

export class ModalBooster extends Modal {
	private readonly displayText: string;
	private readonly mediator: GamificationMediatorImpl; // Use the concrete implementation

	constructor(app: App, displayText: string, mediator: GamificationMediatorImpl) {
		super(app);
		this.displayText = displayText;
		this.mediator = mediator;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText(this.displayText);

		const multiSelectModal = new MultiSelectModal(this.app, [], 'Craft Booster Item', this.mediator); // Create the modal instance

		const button = document.createElement('button');
		button.innerText = 'Open Crafting Table';
		button.classList.add('modal-button');
		button.onclick = () => {
			multiSelectModal.setUseBooster(false);
			multiSelectModal.open();
		};

		const button2 = document.createElement('button');
		button2.innerText = 'Open Booster Board';
		button2.classList.add('modal-button');
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
