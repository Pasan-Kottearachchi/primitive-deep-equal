const normalizeObject = (obj: Record<string, unknown>): Record<string, unknown> => {
    const sortedKeys = Object.keys(obj).sort();
    const result: Record<string, unknown> = {};
    for (const key of sortedKeys) {
        const value = obj[key];
        result[key] = Array.isArray(value)
            ? sortItems(value) // recursively sort arrays within objects
            : typeof value === "object" && value !== null
              ? normalizeObject(value as Record<string, unknown>) // recursively normalizes nested objects
              : value;
    }
    return result;
};

const sortItems = (arr: unknown[]): unknown[] => {
    return [...arr].sort((a, b) => {
        if (typeof a === "object" && typeof b === "object" && a !== null && b !== null) {
            return compareObjects(a as Record<string, unknown>, b as Record<string, unknown>);
        }

        // normalize values to strings to handle mixed types like string and number
        if ((typeof a === "string" && typeof b === "number") || (typeof a === "number" && typeof b === "string")) {
            a = String(a);
            b = String(b);
        }

        if (typeof a === "string" && typeof b === "string") {
            return a.localeCompare(b);
        }

        if (typeof a === "number" && typeof b === "number") {
            return a - b;
        }

        return 0;
    });
};

const compareObjects = (obj1: Record<string, unknown>, obj2: Record<string, unknown>): number => {
    const canon1 = normalizeObject(obj1);
    const canon2 = normalizeObject(obj2);

    const keys1 = Object.keys(canon1).sort();
    const keys2 = Object.keys(canon2).sort();

    if (keys1.length !== keys2.length) {
        return keys1.length - keys2.length;
    }

    for (let i = 0; i < keys1.length; i++) {
        if (keys1[i] !== keys2[i]) {
            return keys1[i] > keys2[i] ? 1 : -1;
        }
        let val1 = canon1[keys1[i]];
        let val2 = canon2[keys2[i]];

        if (val1 !== val2) {
            if (typeof val1 === "object" && typeof val2 === "object" && val1 !== null && val2 !== null) {
                const result = compareObjects(val1 as Record<string, unknown>, val2 as Record<string, unknown>);
                if (result !== 0) return result;
            } else {
                // normalize values to strings for consistent comparison between different types
                if (
                    (typeof val1 === "string" && typeof val2 === "number") ||
                    (typeof val1 === "number" && typeof val2 === "string")
                ) {
                    val1 = String(val1);
                    val2 = String(val2);
                }

                if (typeof val1 === "string" && typeof val2 === "string") {
                    return val1 > val2 ? 1 : val1 < val2 ? -1 : 0;
                } else if (typeof val1 === "number" && typeof val2 === "number") {
                    return val1 > val2 ? 1 : val1 < val2 ? -1 : 0;
                }
            }
            return 0;
        }
    }
    return 0;
};

const deepCompare = (item1: unknown, item2: unknown): boolean => {
    // Check for object vs. array
    if (typeof item1 === "object" && !Array.isArray(item1) && Array.isArray(item2)) return false;
    if (Array.isArray(item1) && typeof item2 === "object" && !Array.isArray(item2)) return false;

    if (Array.isArray(item1) && Array.isArray(item2)) {
        if (item1.length !== item2.length) return false;
        const sorted1 = sortItems(item1);
        const sorted2 = sortItems(item2);
        return sorted1.every((el, index) => deepCompare(el, sorted2[index]));
    }
    if (typeof item1 === "object" && typeof item2 === "object" && item1 !== null && item2 !== null) {
        return compareObjects(item1 as Record<string, unknown>, item2 as Record<string, unknown>) === 0;
    }
    return item1 === item2;
};

export const isEqual = (first: unknown, ...objects: unknown[]): boolean =>
    objects.every((obj) => deepCompare(obj, first));
