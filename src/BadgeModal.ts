import { App, Modal } from 'obsidian';
import { GamificationMediator } from './GamificationMediator';
import {
	badgeNames,
	badgeNamesInit,
	badges
} from './data/constants';
import { Badge } from './badges'
import { appendSafeSvg } from './Utils';

// ─── Types ───────────────────────────────────────────────
interface ParsedBadge {
	name: string;
	displayDate: string;
	sortDate: Date;
	level: string;
	description: string;
	icon: string;
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
		contentEl.addClass('badge-modal');

		contentEl.createEl('h2', { text: '🏆 Your Badges' });

		const rawBadges = this.mediator.getSettingString('receivedBadges');
		const badges = this.parseBadges(rawBadges);

		if (badges.length === 0) {
			this.renderEmptyState(contentEl);
			return;
		}

		// Sort by date (earliest → latest)
		badges.sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime());

		const listEl = contentEl.createDiv({ cls: 'badge-list' });

		for (const badge of badges) {
			// ── Card container ──
			const cardEl = listEl.createDiv({ cls: 'badge-card' });

			// ── Top row: icon + name + meta ──
			const topRow = cardEl.createDiv({ cls: 'badge-card-top' });

			// Icon
			const iconEl = topRow.createSpan({ cls: 'badge-icon' });
			if (badge.icon) {
				appendSafeSvg(iconEl, badge.icon);
			} else {
				iconEl.setText('🏅');
			}

			// Name + meta
			const infoEl = topRow.createDiv({ cls: 'badge-info' });
			infoEl.createDiv({ cls: 'badge-name', text: badge.name });

			const metaEl = infoEl.createDiv({ cls: 'badge-meta' });
			metaEl.createSpan({ cls: 'badge-date', text: badge.displayDate });
			if (badge.level) {
				metaEl.createSpan({ cls: 'badge-level', text: badge.level });
			}

			// ── Description row (always visible) ──
			const descEl = cardEl.createDiv({ cls: 'badge-description' });
			descEl.setText(badge.description || 'A mysterious badge awaiting its story...');
		}
	}

	// ─── Empty State ───────────────────────────────────────
	private renderEmptyState(container: HTMLElement) {
		const emptyEl = container.createDiv({ cls: 'badge-empty-state' });

		emptyEl.createDiv({ cls: 'badge-empty-icon', text: '🌱' });

		emptyEl.createEl('p', {
			cls: 'badge-empty-title',
			text: 'No badges yet — but every great web of knowledge starts with a single note.'
		});

		emptyEl.createEl('p', {
			cls: 'badge-empty-subtitle',
			text: 'Keep capturing ideas, connecting thoughts, and rating your notes with note-maturity. Your first badge is closer than you think!'
		});

		const tipsList = emptyEl.createEl('ul', { cls: 'badge-empty-tips' });
		tipsList.createEl('li', { text: '✍️  Create new notes to earn Init badges (Lore Seeker Initiate → Eternal Archivist)' });
		tipsList.createEl('li', { text: '⭐  Rate your notes with note-maturity to earn Achievement badges (Enlightened Novice → Omniscient Sage)' });
		tipsList.createEl('li', { text: '🔥  Write daily notes to earn Streak badges (Consistent Lore Weaver → Divine Omniscience Overlord)' });
	}

	// ─── Parsing Logic ─────────────────────────────────────
	private parseBadges(raw: string): ParsedBadge[] {
		if (!raw) return [];

		const badgeDefMap = this.buildBadgeDefMap();

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

			const badgeDef = badgeDefMap.get(name);
			const description = badgeDef?.description ?? '';
			const icon       = badgeDef?.icon ?? '';

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
				description,
				icon
			});
		}

		return badges;
	}

	private buildBadgeDefMap(): Map<string, Badge> {
		const map = new Map<string, Badge>();
		const allBadgeArrays = [badgeNames, badgeNamesInit, badges];

		for (const arr of allBadgeArrays) {
			for (const badge of arr) {
				if (!map.has(badge.name)) {
					map.set(badge.name, badge);
				}
			}
		}

		return map;
	}
}
