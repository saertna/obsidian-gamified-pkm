import { ItemView, WorkspaceLeaf } from "obsidian";
import Chart from 'chart.js/auto';



export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
	chart: Chart; // Storing the chart instance if you're using Chart.js
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

		/*const chartContainer = profileContainer.createDiv({ cls: 'chart-container' });
		chartContainer.innerHTML = `
        <canvas id="points-chart"></canvas>
    `;*/

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
		//this.initializeChart();

		const chartContainer = profileContainer.createDiv({ cls: 'chart-container' });
		// @ts-ignore
		const canvas = chartContainer.createEl('canvas', { id: 'points-chart' });

		this.initializeChart(canvas);
	}


	initializeChart(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			console.error('Failed to get canvas context');
			return;
		}

		// Define chart configuration with stacked bars and horizontal orientation
		this.chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Experience'], // X-axis label, displayed on Y-axis in horizontal mode
				datasets: [
					{
						label: 'Points Reached',
						data: [2214079], // Data for points reached
						backgroundColor: 'rgba(54, 162, 235, 0.5)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1
					},
					{
						label: 'Points to Earn to Level Up',
						data: [145921], // Data for points to earn to level up
						backgroundColor: 'rgba(255, 99, 132, 0.5)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				indexAxis: 'y', // Display bars horizontally
				scales: {
					x: {
						beginAtZero: false, // Don't start the X-axis at zero
						min: 2070000, // Minimum value for the X-axis
						max: 2360000, // Maximum value for the X-axis
						stacked: true // Enable stacked bars on the X-axis
					},
					y: {
						beginAtZero: true, // Start the Y-axis at zero
						stacked: true // Enable stacked bars on the Y-axis
					}
				},
				plugins: {
					legend: {
						display: false // Hide the legend, as per your settings
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


}
