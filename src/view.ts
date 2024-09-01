import { ItemView, WorkspaceLeaf } from "obsidian";
import Chart from 'chart.js/auto';
import { DataviewApi, getAPI} from "obsidian-dataview";
import { GamificationMediator } from './GamificationMediator';

export const VIEW_TYPE_GAMIFICATION_PROFILE = "gamified-pkm-profile";

export class GamifiedPkmProfileView extends ItemView {
	chart: Chart;
	chartWeekly: Chart;
	dataview: DataviewApi | null;
	private readonly mediator: GamificationMediator;
    constructor(leaf: WorkspaceLeaf, mediator: GamificationMediator) {
      super(leaf);
		this.mediator = mediator;
    }
  
    getViewType() {
      return VIEW_TYPE_GAMIFICATION_PROFILE;
    }
  
    getDisplayText() {
      return "Gamification";
    }

	getIcon() {
		return "dices"; //"trophy";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();

		const profileContainer = container.createDiv({ cls: 'avatar-profile' });

		this.updateProfilePicture();

		/*const imagePath = this.mediator.getSettingString('avatarPicture'); // Assuming a function to get the setting value

		// Conditionally create the avatar image if the path is provided
		if (imagePath) {
			const fullPath = this.app.vault.adapter.getResourcePath(imagePath);
			const avatarImage = profileContainer.createEl('img', { cls: 'avatar-image' });
			avatarImage.src = fullPath;
		} else {
			// Remove the image container if no path is provided
			profileContainer.empty();
		}*/

		const levelAndPointsContainer = profileContainer.createDiv({ cls: 'level-and-points' });
		levelAndPointsContainer.innerHTML = `
        <p><strong>Level:</strong> <span id="level-value"></span></p>
        <p><strong>Points:</strong> <span id="points-value"></span></p>
    `;

		const chartContainer = profileContainer.createDiv({ cls: 'chart-container' });
		// @ts-ignore
		const canvas = chartContainer.createEl('canvas', { id: 'points-chart' });
		this.initializeChart(canvas);

		const boosterFactorContainer = profileContainer.createDiv({ cls: 'booster-factor' });
		boosterFactorContainer.innerHTML = `
        <p><strong>Booster Factor:</strong> <span id="booster-factor-value"></span></p>
    `;

		const dailyNotesContainer = profileContainer.createDiv({ cls: 'daily-notes' });
		dailyNotesContainer.innerHTML = `
        <p><strong>Daily Notes:</strong> <span id="daily-notes-value"></span></p>
    `;

		const weeklyNotesContainer = profileContainer.createDiv({ cls: 'weekly-notes' });
		weeklyNotesContainer.innerHTML = `
        <p><strong>Weekly Notes:</strong> <span id="weekly-notes-value"></span></p>
    `;

		const chartContainerWeekly = profileContainer.createDiv({ cls: 'chart-container' });
		// @ts-ignore
		const canvasWeekly = chartContainerWeekly.createEl('canvas', { id: 'weekly-chart' });
		this.initializeChartWeekly(canvasWeekly);

		const maturityLevelContainer = profileContainer.createDiv({ cls: 'maturity-level-container' });
		maturityLevelContainer.innerHTML = `
			<table class="maturity-table">
				<thead>
					<tr>
						<th>Level</th>
						<th>Count</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Majurity 5</td>
						<td id="maturity-5-count"></td>
					</tr>
					<tr>
						<td>Majurity 4</td>
						<td id="maturity-4-count"></td>
					</tr>
					<tr>
						<td>Majurity 3</td>
						<td id="maturity-3-count"></td>
					</tr>
					<tr>
						<td>Majurity 2</td>
						<td id="maturity-2-count"></td>
					</tr>
					<tr>
						<td>Majurity 1</td>
						<td id="maturity-1-count"></td>
					</tr>
					<tr>
						<td>Majurity 0</td>
						<td id="maturity-0-count"></td>
					</tr>
				</tbody>
			</table>
		`;

		this.initializeDataview();
	}

	initializeDataview() {
		this.dataview = getAPI(this.app);
		if (!this.dataview) {
			console.error("Dataview plugin is not enabled.");
			return;
		}
		this.updateMaturityCounts();
	}

	updateMaturityCounts() {
		if (!this.dataview) {
			return;
		}

		// Array of maturity levels to check
		const maturityLevels = [5, 4, 3, 2, 1, 0];

		maturityLevels.forEach(level => {
			const count = this.dataview.pages()
				.where((p: { file: { frontmatter: { [x: string]: string | number; }; }; }) => [level, `${level}`, `${level}➡️`, `${level}⬇️`, `${level}⬆️`].includes(p.file.frontmatter['note-maturity']))
				.length;

			const maturityCountElement = this.containerEl.querySelector(`#maturity-${level}-count`);
			if (maturityCountElement) {
				maturityCountElement.textContent = count.toString();
			}
		});
	}

	initializeChart(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			console.error('Failed to get canvas context');
			return;
		}

		this.chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Experience'],
				datasets: [
					{
						label: 'Points Reached',
						data: [0], // Data for points reached
						//backgroundColor: 'rgba(54, 162, 235, 0.5)',
						//borderColor: 'rgba(54, 162, 235, 1)',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						borderColor: 'rgba(0, 0, 0, 1)',
						borderWidth: 1
					},
					{
						label: 'Points to Earn to Level Up',
						data: [0], // Data for points to earn to level up
						//backgroundColor: 'rgba(255, 99, 132, 0.5)',
						//borderColor: 'rgba(255, 99, 132, 1)',
						backgroundColor: 'rgba(255, 255, 255, 0.5)',
						borderColor: 'rgba(255, 255, 255, 0.5)',
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				indexAxis: 'y',
				scales: {
					x: {
						beginAtZero: false,
						min: 0,
						max: 1,
						stacked: true
					},
					y: {
						beginAtZero: true,
						stacked: true
					}
				},
				plugins: {
					legend: {
						display: false // Hide the legend
					},
					tooltip: {
						enabled: true // Enable tooltips for interactivity
					}
				},
				elements: {
					bar: {
						borderWidth: 2 // Set border width for the bars
					}
				}
			}
		});
	}

	initializeChartWeekly(canvasWeekly: HTMLCanvasElement) {
		const ctx = canvasWeekly.getContext('2d');
		if (!ctx) {
			console.error('Failed to get canvas context');
			return;
		}

		this.chartWeekly = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Days in row'],
				datasets: [
					{
						label: 'days done',
						data: [0], // Data for points reached
						//backgroundColor: 'rgba(54, 162, 235, 0.5)',
						//borderColor: 'rgba(54, 162, 235, 1)',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						borderColor: 'rgba(0, 0, 0, 1)',
						borderWidth: 1
					},
					{
						label: 'days to do',
						data: [0], // Data for points to earn to level up
						//backgroundColor: 'rgba(255, 99, 132, 0.5)',
						//borderColor: 'rgba(255, 99, 132, 1)',
						backgroundColor: 'rgba(255, 255, 255, 0.5)',
						borderColor: 'rgba(255, 255, 255, 0.5)',
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				indexAxis: 'y',
				scales: {
					x: {
						beginAtZero: false,
						min: 0,
						max: 7,
						stacked: true
					},
					y: {
						beginAtZero: true,
						stacked: true
					}
				},
				plugins: {
					legend: {
						display: false // Hide the legend
					},
					tooltip: {
						enabled: true // Enable tooltips for interactivity
					}
				},
				elements: {
					bar: {
						borderWidth: 2 // Set border width for the bars
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

	updateChartWeekly(days: number) {
		if (this.chartWeekly) {
			this.chartWeekly.data.datasets[0].data = [days];
			this.chartWeekly.data.datasets[1].data = [7-days];
			this.chartWeekly.update();
		}
	}

	updateChart(newPointsReached: number, newPointsToLevelUp: number) {
		if (this.chart) {
			this.chart.data.datasets[0].data = [newPointsReached];
			this.chart.data.datasets[1].data = [newPointsToLevelUp];
			this.chart.update();
		}
	}

	updateChartMinMax(newPointsReached: number, newPointsToLevelUp: number, newMin: number, newMax: number) {
		if (this.chart) {
			this.chart.data.datasets[0].data = [newPointsReached];
			this.chart.data.datasets[1].data = [newPointsToLevelUp];
			// @ts-ignore
			this.chart.options.scales.x.min = newMin;
			// @ts-ignore
			this.chart.options.scales.x.max = newMax;
			this.chart.update();
		}
	}

	updateProfilePicture() {
		const container = this.containerEl.children[1];
		const profileContainer = container.querySelector('.avatar-profile') as HTMLElement;

		if (profileContainer) {
			// Clear existing profile picture
			const existingAvatarImage = profileContainer.querySelector('.avatar-image') as HTMLImageElement;
			if (existingAvatarImage) {
				existingAvatarImage.remove();
			}

			// Add new profile picture if path is provided
			const imagePath = this.mediator.getSettingString('avatarPicture');
			if (imagePath) {
				const fullPath = this.app.vault.adapter.getResourcePath(imagePath);
				const avatarImage = profileContainer.createEl('img', { cls: 'avatar-image' });
				avatarImage.src = fullPath;
				profileContainer.prepend(avatarImage); // Ensure it is added at the top
			}
		}
	}


}
