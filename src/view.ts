import { ItemView, WorkspaceLeaf, MarkdownRenderer  } from "obsidian";


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
  
/*    async onOpen() {
      const container = this.containerEl.children[1];
      container.empty();
      container.createEl("h4", { text: "Gamification" });
    }*/
	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();

		// Your markdown content
		const markdownContent = `
**Level:** 33  
**Points:** 6564629

\`\`\`chart
type: bar
labels: [Expririence]
series:
    - title: points reached
      data: [6564629]
    - title: points to earn to level up
      data: [305371]
xMin: 6360000
xMax: 6870000
tension: 0.2
width: 70%
labelColors: false
fill: false
beginAtZero: false
bestFit: false
bestFitTitle: undefined
bestFitNumber: 0
stacked: true
indexAxis: y
xTitle: "progress"
legend: false
\`\`\`

**Booster Factor:** 25.2

**Daily Notes:** 13100EP, 2/2  
**Weekly Notes:** 52400EP, 2✔️/7
`;

		// Render markdown into container
		await MarkdownRenderer.renderMarkdown(markdownContent,
			<HTMLElement>container,
			'',
			this);
	}
  
    async onClose() {
      // Nothing to clean up.
    }

    // Method to update content
	updateContent(newContent: string) {
		const container = this.containerEl.children[1];
		container.empty(); // Clear the existing content before adding new content
		const contentDiv = container.createDiv({ cls: "my-plugin-content" });
		contentDiv.setText(newContent);
	}

}
