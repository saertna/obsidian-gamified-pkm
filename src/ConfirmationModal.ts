import { App, Modal, ButtonComponent } from 'obsidian';

export class ConfirmationModal extends Modal {
	private onConfirm: () => void;
	private message: string;
	private title: string;

	constructor(app: App, message: string, title: string, onConfirm: () => void) {
		super(app);
		this.message = message;
		this.title = title
		this.onConfirm = onConfirm;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl("h2", { text: this.title });
		contentEl.createEl("p", { text: this.message });

		// Create a div to hold the buttons
		const buttonContainer = contentEl.createDiv("modal-button-container");

		// "Confirm" button
		new ButtonComponent(buttonContainer)
			.setButtonText("Confirm")
			.setCta()
			.onClick(() => {
				this.onConfirm();
				this.close();
			});

		// "Cancel" button
		new ButtonComponent(buttonContainer)
			.setButtonText("Cancel")
			.onClick(() => {
				this.close();
			});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
