export const getFeedsCountPosition = (feedsCount, numberOftypes) => {
    return `${-12 * Math.floor(Math.log10(feedsCount) + 1) + numberOftypes * 3}px`;
}