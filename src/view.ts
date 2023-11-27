import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
      super(leaf);
    }
  
    getViewType() {
      return VIEW_TYPE_EXAMPLE;
    }
  
    getDisplayText() {
      return "Gamification";
    }
  
    async onOpen() {
      const container = this.containerEl.children[1];
      container.empty();
      container.createEl("h4", { text: "Gamification" });
    }
  
    async onClose() {
      // Nothing to clean up.
    }

    // Method to update content
    updateContent(newContent: string) {
      const container = this.containerEl.children[1];
      const contentDiv = container.createDiv({ cls: "my-plugin-content" });
      contentDiv.setText(newContent);
    }
  }