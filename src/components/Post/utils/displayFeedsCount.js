export const displayFeedsCount = (numberOfFeeds) => {
    return numberOfFeeds < 1000 ? numberOfFeeds : `${numberOfFeeds % 1000}k`; 
}