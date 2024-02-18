import { App, MarkdownRenderer, Modal } from "obsidian";
import { isVersionNewerThanOther } from "./Utils";
import gamification from "./main";
import { RELEASE_NOTES, FIRST_TIME } from "./Messages";
import { PLUGIN_VERSION } from "./constants"

export class ReleaseNotes extends Modal {
  private plugin: gamification;
  private version: string | null;


	constructor(app: App, plugin: gamification, version: string) {
    super(app);
    this.plugin = plugin;
    this.version = version;
  }

  onOpen(): void {
    this.containerEl.classList.add("gamified-pkm-release");
	if(this.version == '0.0.0'){
		this.titleEl.setText(`Welcome to the Gamified PKM`);
	} else {
		this.titleEl.setText(`Welcome to the Gamified PKM ${this.version ?? ""}`);
	}
    this.createForm();
  }

  async onClose() {
    this.contentEl.empty();
    await this.plugin.loadSettings();
	this.plugin.setSettingString('previousRelease',PLUGIN_VERSION)
  }

  async createForm() {
    let prevRelease = this.plugin.getSettingString('previousRelease');
	prevRelease = this.version === prevRelease ? "0.0.0" : prevRelease;
	const message = this.version === '0.0.0'
		? FIRST_TIME
		: Object.keys(RELEASE_NOTES)
			.filter((key) => key === "Intro" || isVersionNewerThanOther(key, prevRelease))
			.map((key: string) => `${key === "Intro" ? "" : `# ${key}\n`}${RELEASE_NOTES[key]}`)
			.slice(0, 10)
			.join("\n\n---\n");
  await MarkdownRenderer.renderMarkdown(
      message,
      this.contentEl,
      "",
      this.plugin,
    );

    this.contentEl.createEl("p", { text: "" }, (el) => {
      //files manually follow one of two options:
      el.style.textAlign = "right";
      const bOk = el.createEl("button", { text: "Close" });
      bOk.onclick = () => this.close();
    });
  }
}
