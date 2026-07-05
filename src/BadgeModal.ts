import { App, Modal } from 'obsidian';
import { GamificationMediator } from './GamificationMediator';
import {
	badgeNames,
	badgeNamesInit,
	badges
} from './data/constants';

// ─── Types ───────────────────────────────────────────────
interface ParsedBadge {
	name: string;
	displayDate: string;
	sortDate: Date;
	level: string;
	description: string;
}

// ─── Modal ───────────────────────────────────────────────
export class BadgeModal extends Modal {
	private mediator: GamificationMediator;

	constructor(app: App, mediator: GamificationMediator) {
		super(app);
		this.mediator = mediator;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass('pkm-badge-modal');

		contentEl.createEl('h2', { text: '🏆 Your Badges' });

		const rawBadges = this.mediator.getSettingString('receivedBadges');
		const badges = this.parseBadges(rawBadges);

		if (badges.length === 0) {
			this.renderEmptyState(contentEl);
			return;
		}

		// Sort by date (earliest → latest)
		badges.sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime());

		const listEl = contentEl.createDiv({ cls: 'pkm-badge-list' });

		for (const badge of badges) {
			const badgeEl = listEl.createDiv({ cls: 'pkm-badge-item' });

			// Icon placeholder
			badgeEl.createSpan({ cls: 'pkm-badge-icon', text: '🏅' });

			// Info block
			const infoEl = badgeEl.createDiv({ cls: 'pkm-badge-info' });
			infoEl.createDiv({ cls: 'pkm-badge-name', text: badge.name });

			const metaEl = infoEl.createDiv({ cls: 'pkm-badge-meta' });
			metaEl.createSpan({ cls: 'badge-date', text: badge.displayDate });
			if (badge.level) {
				metaEl.createSpan({ cls: 'pkmbadge-level', text: badge.level });
			}

			// Hover tooltip
			if (badge.description) {
				badgeEl.title = badge.description;
			}
		}
	}

	// ─── Empty State ───────────────────────────────────────
	private renderEmptyState(container: HTMLElement) {
		const emptyEl = container.createDiv({ cls: 'pkm-badge-empty-state' });

		// Encouraging icon
		emptyEl.createDiv({ cls: 'pkm-badge-empty-icon', text: '🌱' });

		// Main encouraging message
		emptyEl.createEl('p', {
			cls: 'pkm-badge-empty-title',
			text: 'No badges yet — but every great web of knowledge starts with a single note.'
		});

		// Action-oriented subtext
		emptyEl.createEl('p', {
			cls: 'pkm-badge-empty-subtitle',
			text: 'Keep capturing ideas, connecting thoughts, and rating your notes with note-maturity. Your first badge is closer than you think!'
		});

		// Quick tips on how to earn badges
		const tipsList = emptyEl.createEl('ul', { cls: 'pkm-badge-empty-tips' });
		tipsList.createEl('li', { text: '✍️  Create new notes to earn Init badges (Lore Seeker Initiate → Eternal Archivist)' });
		tipsList.createEl('li', { text: '⭐  Rate your notes with note-maturity to earn Achievement badges (Enlightened Novice → Omniscient Sage)' });
		tipsList.createEl('li', { text: '🔥  Write daily notes to earn Streak badges (Consistent Lore Weaver → Divine Omniscience Overlord)' });
	}

	// ─── Parsing Logic ─────────────────────────────────────
	private parseBadges(raw: string): ParsedBadge[] {
		if (!raw) return [];

		const descriptionMap = this.buildDescriptionMap();

		const parts = raw.split('##');
		const badges: ParsedBadge[] = [];

		for (const part of parts) {
			const trimmed = part.trim();
			if (!trimmed) continue;

			const fields = trimmed.split(',');
			if (fields.length < 2) continue;

			const name = fields[0].trim();
			const dateStr = fields[1].trim();
			const levelStr = fields.length > 2
				? fields.slice(2).join(',').trim()
				: '';

			const description = descriptionMap.get(name) ?? '';

			// Normalize date
			let sortDate: Date;
			let displayDate: string;

			if (dateStr.length === 10 && dateStr[4] === '-') {
				const [y, m, d] = dateStr.split('-');
				sortDate = new Date(Number(y), Number(m) - 1, Number(d));
				displayDate = dateStr;
			} else {
				const [y, m, d] = dateStr.split('-');
				sortDate = new Date(2000 + Number(y), Number(m) - 1, Number(d));
				displayDate = `20${y}-${m}-${d}`;
			}

			badges.push({
				name,
				displayDate,
				sortDate,
				level: levelStr,
				description
			});
		}

		return badges;
	}

	private buildDescriptionMap(): Map<string, string> {
		const map = new Map<string, string>();
		const allBadgeArrays = [badgeNames, badgeNamesInit, badges];

		for (const arr of allBadgeArrays) {
			for (const badge of arr) {
				if (!map.has(badge.name)) {
					map.set(badge.name, badge.description);
				}
			}
		}

		return map;
	}
}
