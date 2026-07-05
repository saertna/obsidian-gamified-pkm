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
		contentEl.addClass('gpkm-badge-modal');

		contentEl.createEl('h2', { text: '🏆 Your Badges' });

		const rawBadges = this.mediator.getSettingString('receivedBadges');
		const badges = this.parseBadges(rawBadges);

		if (badges.length === 0) {
			contentEl.createEl('p', {
				text: 'No badges earned yet. Start your journey to collect them all!',
				cls: 'badge-empty-message'
			});
			return;
		}

		// Sort by date (earliest → latest)
		badges.sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime());

		const listEl = contentEl.createDiv({ cls: 'badge-list' });

		for (const badge of badges) {
			const badgeEl = listEl.createDiv({ cls: 'badge-item' });

			// Icon placeholder
			badgeEl.createSpan({ cls: 'badge-icon', text: '🏅' });

			// Info block
			const infoEl = badgeEl.createDiv({ cls: 'badge-info' });
			infoEl.createDiv({ cls: 'badge-name', text: badge.name });

			const metaEl = infoEl.createDiv({ cls: 'badge-meta' });
			metaEl.createSpan({ cls: 'badge-date', text: badge.displayDate });
			if (badge.level) {
				metaEl.createSpan({ cls: 'badge-level', text: badge.level });
			}

			// Hover tooltip
			if (badge.description) {
				badgeEl.title = badge.description;
			}
		}
	}

	// ─── Parsing Logic ─────────────────────────────────────
	private parseBadges(raw: string): ParsedBadge[] {
		if (!raw) return [];

		// Build a unified description lookup (name → description) from ALL badge arrays
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

			// Look up description from the unified map
			const description = descriptionMap.get(name) ?? '';

			// Normalize date
			let sortDate: Date;
			let displayDate: string;

			if (dateStr.length === 10 && dateStr[4] === '-') {
				// Format: YYYY-MM-DD
				const [y, m, d] = dateStr.split('-');
				sortDate = new Date(Number(y), Number(m) - 1, Number(d));
				displayDate = dateStr;
			} else {
				// Format: YY-MM-DD  →  YYYY-MM-DD
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

	/**
	 * Merges all badge arrays from constants.ts into a single Map.
	 * This ensures every possible badge name gets its description,
	 * regardless of which array it lives in.
	 */
	private buildDescriptionMap(): Map<string, string> {
		const map = new Map<string, string>();

		const allBadgeArrays = [badgeNames, badgeNamesInit, badges];

		for (const arr of allBadgeArrays) {
			for (const badge of arr) {
				// Only set if not already present (first match wins;
				// you can change priority by reordering the array above)
				if (!map.has(badge.name)) {
					map.set(badge.name, badge.description);
				}
			}
		}

		return map;
	}
}
