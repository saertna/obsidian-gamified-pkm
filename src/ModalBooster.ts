import { App, Modal } from 'obsidian';
//import gamification from 'main';
import { MultiSelectModal } from 'MultiSelectModal';
import { GamificationMediator } from './GamificationMediator';

export class ModalBooster extends Modal {
	private readonly displayText: string;
	//private readonly gamificationInstance: gamification;
	private readonly mediator: GamificationMediator;

	// constructor(app: App, displayText: string, gamificationInstance: gamification) {
	// 	super(app);
	// 	this.displayText = displayText;
	// 	this.gamificationInstance = gamificationInstance;
	// }

	constructor(app: App, displayText: string, mediator: GamificationMediator) {
		super(app);
		this.displayText = displayText;
		this.mediator = mediator;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText(this.displayText);
		

		//const multiSelectModal = new MultiSelectModal(this.app, [], 'Craft Booster Item', this.gamificationInstance); // Create the modal instance
		const multiSelectModal = new MultiSelectModal(this.app, [], 'Craft Booster Item', this.mediator);


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
