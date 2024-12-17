const deepCompare = (item1: unknown, item2: unknown): boolean => {
    // Check if both items are NaN
    if (typeof item1 === 'number' && typeof item2 === 'number' && Number.isNaN(item1) && Number.isNaN(item2)) {
        return true;
    }

    // Check if both items are of the same type
    if (typeof item1 !== typeof item2) {
        return false;
    }

    // If both items are primitive types, compare directly
    if (typeof item1 !== 'object' || item1 === null || item2 === null) {
        return item1 === item2;
    }

    // If both items are arrays
    if (Array.isArray(item1) && Array.isArray(item2)) {
        // Check if arrays are of same length
        if (item1.length !== item2.length) {
            return false;
        }

        // Sort arrays before comparison
        const sortedItem1 = [...item1].sort();
        const sortedItem2 = [...item2].sort();

        // Compare each element of the sorted arrays
        return sortedItem1.every((val, index) => deepCompare(val, sortedItem2[index]));
    }

    // If both items are objects
    if (!Array.isArray(item1) && typeof item1 === 'object' && typeof item2 === 'object') {
        const keys1 = Object.keys(item1);
        const keys2 = Object.keys(item2);

        // Check if objects have same number of properties
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Check if objects have same keys
        if (!keys2.some((key, keyIndex) => key === keys1[keyIndex])) {
            return false;
        }

        // Compare each property of the objects
        return keys1.every((key) =>
            deepCompare(
                (item1 as Record<string, unknown>)[key],
                (item2 as Record<string, unknown>)[key]
            )
        );
    }

    // If none of the above, return false
    return false;
};

export const isEqual = (first: unknown, ...objects: unknown[]): boolean =>
    objects.every((obj) => deepCompare(obj, first));
