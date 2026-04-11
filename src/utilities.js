// Helper function to calculate expiration date based on duration
export function calculateExpirationDate(duration) {
    const { value, unit } = duration;
    const now = Date.now(); // Current time in milliseconds

    let expiresAt = now;

    switch (unit) {
        case "instant":
            expiresAt += 1000; // Add 1 second delay
            break;
        case "minutes":
            expiresAt += value * 60 * 1000; // Add value in minutes (converted to ms)
            break;
        case "hours":
            expiresAt += value * 60 * 60 * 1000; // Add value in hours (converted to ms)
            break;
        case "days":
            expiresAt += value * 24 * 60 * 60 * 1000; // Add value in days (converted to ms)
            break;
        case "months":
            const dateMonth = new Date(now);
            dateMonth.setMonth(dateMonth.getMonth() + value); // Add value in months
            expiresAt = dateMonth.getTime(); // Get milliseconds for months
            break;
        case "years":
            const dateYear = new Date(now);
            dateYear.setFullYear(dateYear.getFullYear() + value); // Add value in years
            expiresAt = dateYear.getTime(); // Get milliseconds for years
            break;
        default:
            console.warn(`Unsupported unit: ${unit}`);
            break;
    }

    return new Date(expiresAt).toISOString(); // Convert to ISO format string
}