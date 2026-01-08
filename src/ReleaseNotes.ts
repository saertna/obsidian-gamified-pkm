import { App, MarkdownRenderer, Modal, Component  } from "obsidian";
import { isVersionNewerThanOther } from "./Utils";
import { GamificationMediatorImpl } from "./GamificationMediatorImpl"; // Import the new mediator implementation
import { RELEASE_NOTES, FIRST_TIME } from "./Messages";
import { PLUGIN_VERSION } from "./data/constants";

export class ReleaseNotes extends Modal {
	private mediator: GamificationMediatorImpl; // Use the mediator implementation
	private version: string | null;

	constructor(app: App, mediator: GamificationMediatorImpl, version: string) {
		super(app);
		this.mediator = mediator;
		this.version = version;
	}

	onOpen(): void {
		this.containerEl.classList.add("gamified-pkm-release");
		if (this.version === '0.0.0') {
			this.titleEl.setText(`Welcome to the Gamified PKM`);
		} else {
			this.titleEl.setText(`Welcome to the Gamified PKM ${this.version ?? ""}`);
		}
		this.createForm();
	}

	async onClose() {
		this.contentEl.empty();
		await this.mediator.loadSettings(); // Assuming loadSettings is now part of the mediator
		this.mediator.setSettingString('previousRelease', PLUGIN_VERSION);
	}

	async createForm() {
		let prevRelease = this.mediator.getSettingString('previousRelease');
		prevRelease = this.version === prevRelease ? "0.0.0" : prevRelease;
		const message = this.version === '0.0.0'
			? FIRST_TIME
			: Object.keys(RELEASE_NOTES)
				.filter((key) => key === "Intro" || isVersionNewerThanOther(key, prevRelease))
				.map((key: string) => `${key === "Intro" ? "" : `# ${key}\n`}${RELEASE_NOTES[key]}`)
				.slice(0, 10)
				.join("\n\n---\n");

		const dummyComponent = new DummyComponent();

		await MarkdownRenderer.renderMarkdown(
			message,
			this.contentEl,
			"",
			dummyComponent
		);

    this.contentEl.createEl("p", { text: "" }, (el) => {
      //files manually follow one of two options:
      el.style.textAlign = "right";
      const bOk = el.createEl("button", { text: "Close" });
      bOk.onclick = () => this.close();
    });
  }
}

class DummyComponent extends Component {
	// Implement required methods, even if they are empty
	onload() {}
	onunload() {}
}
