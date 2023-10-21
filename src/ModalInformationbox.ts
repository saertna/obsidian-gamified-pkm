import { App, Modal } from 'obsidian';

export class ModalInformationbox extends Modal {
	private readonly displayText: string; // Store the text to be displayed

	constructor(app: App, displayText: string) {
		super(app);
		this.displayText = displayText; // Store the passed text
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText(this.displayText); // Use the stored text
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
