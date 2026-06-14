import { ItemView, WorkspaceLeaf } from "obsidian";
import Chart from 'chart.js/auto';
import { DataviewApi, getAPI} from "obsidian-dataview";
import { GamificationMediator } from './GamificationMediator';

export const VIEW_TYPE_GAMIFICATION_PROFILE = "gamified-pkm-profile";

export class GamifiedPkmProfileView extends ItemView {
	chart: Chart;
	chartWeekly: Chart;
	dataview: DataviewApi | null | undefined = null;
	levelSpan: HTMLElement;
	pointsSpan: HTMLElement;
	boosterSpan: HTMLElement;
	dailyNotesSpan: HTMLElement;
	weeklyNotesSpan: HTMLElement;
	maturitySpans: Record<number, HTMLElement> = {};
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
		// TIP: Use this.contentEl instead of children[1] for better stability
		const { contentEl } = this;
		contentEl.empty();
		const profileContainer = contentEl.createDiv({ cls: 'avatar-profile' });
		this.updateProfilePicture();
		// 1. Level and Points
		const levelAndPointsContainer = profileContainer.createDiv({ cls: 'level-and-points' });
		const levelP = levelAndPointsContainer.createEl('p');
		levelP.createEl('strong', { text: 'Level: ' });
		// Store reference instead of searching by ID later
		this.levelSpan = levelP.createEl('span', { attr: { id: 'level-value' } });
		const pointsP = levelAndPointsContainer.createEl('p');
		pointsP.createEl('strong', { text: 'Points: ' });
		this.pointsSpan = pointsP.createEl('span', { attr: { id: 'points-value' } });
		// 2. Chart
		const chartContainer = profileContainer.createDiv({ cls: 'chart-container' });
		const canvas = chartContainer.createEl('canvas', { attr: { id: 'points-chart' } });
		this.initializeChart(canvas);
		// 3. Booster Factor
		const boosterFactorContainer = profileContainer.createDiv({ cls: 'booster-factor' });
		const boosterP = boosterFactorContainer.createEl('p');
		boosterP.createEl('strong', { text: 'Booster Factor: ' });
		this.boosterSpan = boosterP.createEl('span', { attr: { id: 'booster-factor-value' } });


		const dailyNotesContainer = profileContainer.createDiv({ cls: 'daily-notes' });
		const dailyP = dailyNotesContainer.createEl('p');
		dailyP.createEl('strong', { text: 'Daily Notes: ' });
		this.dailyNotesSpan = dailyP.createEl('span', { attr: { id: 'daily-notes' } });


		const weeklyNotesContainer = profileContainer.createDiv({ cls: 'weekly-notes' });
		const weeklyP = weeklyNotesContainer.createEl('p');
		weeklyP.createEl('strong', { text: 'WeeklyNotes: ' });
		this.weeklyNotesSpan = weeklyP.createEl('span', { attr: { id: 'weekly-notes' } });

		const chartContainerWeekly = profileContainer.createDiv({ cls: 'chart-container' });
		// @ts-ignore
		const canvasWeekly = chartContainerWeekly.createEl('canvas', { id: 'weekly-chart' });
		this.initializeChartWeekly(canvasWeekly);

		// 4. Maturity Table (The "Big" innerHTML replacement)
		const maturityLevelContainer = profileContainer.createDiv({ cls: 'maturity-level-container' });
		const table = maturityLevelContainer.createEl('table', { cls: 'maturity-table' });

		const thead = table.createEl('thead').createEl('tr');
		thead.createEl('th', { text: 'Level' });
		thead.createEl('th', { text: 'Count' });
		const tbody = table.createEl('tbody');
		for (let i = 5; i >= 0; i--) {
			const row = tbody.createEl('tr');
			row.createEl('td', { text: `Maturity ${i}` });
			// Store the reference in our Record object
			this.maturitySpans[i] = row.createEl('td', {
				attr: { id: `maturity-${i}-count` }
			});
		}


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
		const dv = this.dataview;

		// 2. Perform the check on the local constant
		if (!dv) {
			console.debug('dataview plugin is not available to update maturity counts');
			return;
		}

		const maturityLevels = [5, 4, 3, 2, 1, 0];

		maturityLevels.forEach(level => {
			const count = dv.pages()
				.where((p: any) => this.isMaturityMatch(p.file.frontmatter, level))
				.length;

			const span = this.maturitySpans[level];
			if (span) {
				span.setText(count.toString());
			}
		});
	}


	private isMaturityMatch(frontmatter: any, targetLevel: number): boolean {
		const val = frontmatter['note-maturity'];
		const validMatches = [targetLevel, `${targetLevel}`, `${targetLevel}➡️`, `${targetLevel}⬇️`, `${targetLevel}⬆️`];
		return validMatches.includes(val);
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
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						borderColor: 'rgba(0, 0, 0, 1)',
						borderWidth: 1
					},
					{
						label: 'Points to Earn to Level Up',
						data: [0], // Data for points to earn to level up
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
      //this.mediator.setSettingBoolean('showProfileLeaf', false)
    }

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
			pointsValue.textContent = Math.round(newPoints).toString();
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
			console.log(`updateDailyNotes triggered with value: $newValue`)
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

	updateChartWeeklyColorReceived(colorReceived: string) {
		if (this.chartWeekly) {
			this.chartWeekly.data.datasets[0].backgroundColor = colorReceived;
			this.chartWeekly.data.datasets[0].borderColor = colorReceived;
			this.chartWeekly.update();
		}
		if (this.chart) {
			this.chart.data.datasets[0].backgroundColor = colorReceived;
			this.chart.data.datasets[0].borderColor = colorReceived;
			this.chart.update();
		}
	}

	updateChartWeeklyColorToGo(colorToGo: string) {
		if (this.chartWeekly) {
			this.chartWeekly.data.datasets[1].backgroundColor = colorToGo;
			this.chartWeekly.data.datasets[1].borderColor = colorToGo;
			this.chartWeekly.update();
		}
		if (this.chart) {
			this.chart.data.datasets[1].backgroundColor = colorToGo;
			this.chart.data.datasets[1].borderColor = colorToGo;
			this.chart.update();
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
