import { App, MarkdownRenderer, Modal } from "obsidian";
import { isVersionNewerThanOther } from "./Utils";
import gamification from "./main";
import { FIRST_RUN, RELEASE_NOTES } from "./Messages";
import { PLUGIN_VERSION } from "./main"

//declare const PLUGIN_VERSION:string;

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
    this.titleEl.setText(`Welcome to the Gamified PKM ${this.version ?? ""}`);
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
    const message = this.version
      ? Object.keys(RELEASE_NOTES)
          .filter((key) => key === "Intro" || isVersionNewerThanOther(key,prevRelease))
          .map((key: string) => `${key==="Intro" ? "" : `# ${key}\n`}${RELEASE_NOTES[key]}`)
          .slice(0, 10)
          .join("\n\n---\n")
      : FIRST_RUN;
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
