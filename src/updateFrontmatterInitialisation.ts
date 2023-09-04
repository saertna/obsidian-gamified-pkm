import {rateDirection} from "./majuritycalculation";

export function rateDirectionForStatusPoints(ratingCurrent: string, ratingNew: number): number {
	let ratingFaktor = 0
	//console.log(`ratingCurrent: ${parseInt(ratingCurrent, 10)}`)
	if (parseInt(ratingCurrent, 10) < ratingNew) {
		ratingFaktor = ratingNew - parseInt(ratingCurrent, 10)
		//console.log(`ratingFaktor: ${ratingFaktor}\t ratingNew: ${ratingNew}\tratingcurrent: ${ratingCurrent}`)
	} else {
		ratingFaktor = 0
	}

	return ratingFaktor
}

export function updateFrontmatterInitialisation(frontmatter: any, noteMajurity: number, pointsReceived: number, pointsNoteMajurity: number, fileNameRate: number, pointsMajurity: number, rateFileLength: number, inlinkClass: number, rateOut: number, rateProgressiveSum: number) {
	const avatarPageName = this.settings.avatarPageName;
	if (rateDirectionForStatusPoints(frontmatter['note-maturity'], noteMajurity) >= 1) {
        pointsReceived += pointsNoteMajurity * rateDirectionForStatusPoints(frontmatter['note-maturity'], noteMajurity)
        this.giveStatusPoints(avatarPageName, pointsNoteMajurity * rateDirectionForStatusPoints("frontmatter['note-maturity']", noteMajurity))

    } else if (!('note-maturity' in frontmatter)) {
        pointsReceived += pointsNoteMajurity * rateDirectionForStatusPoints("0", noteMajurity)
        this.giveStatusPoints(avatarPageName, pointsNoteMajurity * rateDirectionForStatusPoints("0", noteMajurity))
    }

    if (rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate) >= 1 && 'title-class' in frontmatter) {
        pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate)
        this.giveStatusPoints(avatarPageName, pointsMajurity * rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate))

    } else if (!('title-class' in frontmatter)) {
        pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", fileNameRate)
        this.giveStatusPoints(avatarPageName, pointsMajurity * rateDirectionForStatusPoints("0", fileNameRate))

    }

    if (rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength) >= 1) {
        pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength)
        this.giveStatusPoints(avatarPageName, pointsMajurity * rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength))

    } else if (!('note-length-class' in frontmatter)) {
        pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", rateFileLength)
        this.giveStatusPoints(avatarPageName, pointsMajurity * rateDirectionForStatusPoints("0", rateFileLength))

    }

    if (rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass) >= 1) {
        pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass)
        this.giveStatusPoints(avatarPageName, pointsMajurity * rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass))

    } else if (!('inlink-class' in frontmatter)) {
        pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", inlinkClass)
        this.giveStatusPoints(avatarPageName, pointsMajurity * rateDirectionForStatusPoints("0", inlinkClass))

    }

    if (rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut) >= 1) {
        pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut)
        this.giveStatusPoints(avatarPageName, pointsMajurity * rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut))

    } else if (!('outlink-class' in frontmatter)) {
        pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", rateOut)
        this.giveStatusPoints(avatarPageName, pointsMajurity * rateDirectionForStatusPoints("0", rateOut))

    }

    if (rateDirectionForStatusPoints(frontmatter['progressive-sumarization-maturity'], rateProgressiveSum) >= 1) {
        pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['progressive-sumarization-maturity'], rateProgressiveSum)
        this.giveStatusPoints(avatarPageName, pointsMajurity * rateDirectionForStatusPoints(frontmatter['progressive-sumarization-maturity'], rateProgressiveSum))

    } else if (!('progressive-sumarization-maturity' in frontmatter)) {
        pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['progressive-sumarization-maturity'], rateProgressiveSum)
        this.giveStatusPoints(avatarPageName, pointsMajurity * rateDirectionForStatusPoints("0", rateProgressiveSum))

    }
    //console.log(`pointsReceived: ${pointsReceived}\tnext are frontmatters …`)


    frontmatter['title-class'] = rateDirection(frontmatter['title-class'], fileNameRate)
    frontmatter['note-length-class'] = rateDirection(frontmatter['note-length-class'], rateFileLength)
    frontmatter['inlink-class'] = rateDirection(frontmatter['inlink-class'], inlinkClass)
    frontmatter['outlink-class'] = rateDirection(frontmatter['outlink-class'], rateOut)
    frontmatter['progressive-sumarization-maturity'] = rateDirection(frontmatter['progressive-sumarization-maturity'], rateProgressiveSum)
    frontmatter['note-maturity'] = rateDirection(frontmatter['note-maturity'], noteMajurity)
    return pointsReceived;
}
