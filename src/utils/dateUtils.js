// utils/dateUtils.js

/**
 * Returns the ordinal suffix for a given day.
 * @param {number} day - The day of the month.
 * @returns {string} - The ordinal suffix (e.g., "st", "nd", "rd", "th").
 */
export const getOrdinalSuffix = (day) => {
    const j = day % 10;
    const k = day % 100;
    if (j === 1 && k !== 11) {
        return 'st';
    }
    if (j === 2 && k !== 12) {
        return 'nd';
    }
    if (j === 3 && k !== 13) {
        return 'rd';
    }
    return 'th';
};

/**
 * Formats a timestamp into a string with day, month, year, and ordinal suffix.
 * @param {number} timestamp - The timestamp in milliseconds.
 * @returns {string} - The formatted date string.
 */
export const formatDateWithOrdinal = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const year = date.getFullYear();

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};
