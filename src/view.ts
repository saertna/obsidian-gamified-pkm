import { ItemView, WorkspaceLeaf } from "obsidian";
import Chart from 'chart.js/auto';



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

		// Create main container for the avatar profile
		const profileContainer = container.createDiv({ cls: 'avatar-profile' });

		// Add sections for different parts of the content
		const avatarImage = profileContainer.createEl('img', { cls: 'avatar-image' });
		avatarImage.src = 'Attachements/Avatar-Zettelkasten.png';

		const levelAndPointsContainer = profileContainer.createDiv({ cls: 'level-and-points' });
		levelAndPointsContainer.innerHTML = `
        <p><strong>Level:</strong> <span id="level-value">33</span></p>
        <p><strong>Points:</strong> <span id="points-value">6564629</span></p>
    `;

		const chartContainer = profileContainer.createDiv({ cls: 'chart-container' });
		chartContainer.innerHTML = `
        <canvas id="points-chart"></canvas>
    `;

		const boosterFactorContainer = profileContainer.createDiv({ cls: 'booster-factor' });
		boosterFactorContainer.innerHTML = `
        <p><strong>Booster Factor:</strong> <span id="booster-factor-value">25.2</span></p>
    `;

		const dailyNotesContainer = profileContainer.createDiv({ cls: 'daily-notes' });
		dailyNotesContainer.innerHTML = `
        <p><strong>Daily Notes:</strong> 13100EP, <span id="daily-notes-value">2/2</span></p>
    `;

		const weeklyNotesContainer = profileContainer.createDiv({ cls: 'weekly-notes' });
		weeklyNotesContainer.innerHTML = `
        <p><strong>Weekly Notes:</strong> 52400EP, <span id="weekly-notes-value">2✔️/7</span></p>
    `;

		// Initialize chart (for example using Chart.js)
		this.initializeChart();
	}

	initializeChart() {
		// @ts-ignore
		const ctx = document.getElementById('points-chart').getContext('2d');
		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Experience'],
				datasets: [{
					label: 'Points Reached',
					data: [6564629],
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					borderColor: 'rgba(54, 162, 235, 1)',
					borderWidth: 1
				}, {
					label: 'Points to Earn to Level Up',
					data: [305371],
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgba(255, 99, 132, 1)',
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					x: {
						beginAtZero: true
					}
				}
			}
		});
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

	updateLevel(newLevel: number) {
		const levelValue = this.containerEl.querySelector('#level-value');
		if (levelValue) {
			levelValue.textContent = newLevel.toString();
		}
	}

	updatePoints(newPoints: number) {
		const pointsValue = this.containerEl.querySelector('#points-value');
		if (pointsValue) {
			pointsValue.textContent = newPoints.toString();
		}
	}

	updateBoosterFactor(newFactor: number) {
		const boosterFactorValue = this.containerEl.querySelector('#booster-factor-value');
		if (boosterFactorValue) {
			boosterFactorValue.textContent = newFactor.toFixed(1);
		}
	}

	updateDailyNotes(newValue: string) {
		const dailyNotesValue = this.containerEl.querySelector('#daily-notes-value');
		if (dailyNotesValue) {
			dailyNotesValue.textContent = newValue;
		}
	}

	updateWeeklyNotes(newValue: string) {
		const weeklyNotesValue = this.containerEl.querySelector('#weekly-notes-value');
		if (weeklyNotesValue) {
			weeklyNotesValue.textContent = newValue;
		}
	}



}
