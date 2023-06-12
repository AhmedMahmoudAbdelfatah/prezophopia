export const openFileSelector = (event) => {
    return (
        event.currentTarget.className === "enabled" &&
        event.currentTarget.lastElementChild.click()
    );
}