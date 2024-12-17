import {isEqual} from "../src";

describe('isEqual', () => {
    it('should return true when comparing equal strings', () => {
        expect(isEqual('hello', 'hello')).toBe(true);
        expect(isEqual('', '')).toBe(true);
        expect(isEqual('123', '123')).toBe(true);
        expect(isEqual('a', 'a', 'a')).toBe(true);
        expect(isEqual('', '', '')).toBe(true);
    });

    it('should return false when comparing not equal strings', () => {
        expect(isEqual('hello', 'world')).toBe(false);
        expect(isEqual('hello', 'HELLO')).toBe(false);
        expect(isEqual('hello', 'hello', 'world')).toBe(false);
        expect(isEqual('hello', '', 'hello')).toBe(false);
    });

    it('should return true when comparing equal numbers', () => {
        expect(isEqual(42, 42)).toBe(true);
        expect(isEqual(0, 0)).toBe(true);
        expect(isEqual(0, -0)).toBe(true);
        expect(isEqual(-1, -1)).toBe(true);
        expect(isEqual(1, 1, 1)).toBe(true);
        expect(isEqual(-1, -1, -1)).toBe(true);
        expect(isEqual(0, 0, 0)).toBe(true);
    });

    it('should return false when comparing not equal numbers', () => {
        expect(isEqual(0, 24)).toBe(false);
        expect(isEqual(42, 24)).toBe(false);
        expect(isEqual(1, 1, 2)).toBe(false);
        expect(isEqual(0, 0, 2)).toBe(false);
    });

    it('should return true when comparing equal booleans', () => {
        expect(isEqual(true, true)).toBe(true);
        expect(isEqual(false, false)).toBe(true);
        expect(isEqual(true, true, true)).toBe(true);
        expect(isEqual(false, false, false)).toBe(true);
    });

    it('should return false when comparing not equal booleans', () => {
        expect(isEqual(true, false)).toBe(false);
        expect(isEqual(true, true, false)).toBe(false);
    });

    it('should return true when comparing two NaN values', () => {
        expect(isEqual(NaN, NaN)).toBe(true);
    });

    it('should return true when comparing equal null values', () => {
        expect(isEqual(null, null)).toBe(true);
        expect(isEqual(null, null, null)).toBe(true);
    });

    it('should return true when comparing equal undefined values', () => {
        expect(isEqual(undefined, undefined)).toBe(true);
        expect(isEqual(undefined, undefined, undefined)).toBe(true);
    });

    it('should return true when comparing equal decimal numbers', () => {
        expect(isEqual(3.14, 3.14)).toBe(true);
        expect(isEqual(3.14, +3.14)).toBe(true);
        expect(isEqual(0.3, 0.3)).toBe(true);
        expect(isEqual(-5.678, -5.678)).toBe(true);
        expect(isEqual(1.1, 1.1, 1.1)).toBe(true);
    });

    it('should return false when comparing not equal decimal numbers', () => {
        expect(isEqual(3.14, 3.14159)).toBe(false);
        expect(isEqual(3.14, 3.140000000000001)).toBe(false);
        expect(isEqual(0.3, 0.4)).toBe(false);
        expect(isEqual(-5.678, 5.678)).toBe(false);
        expect(isEqual(1.1, 1.1, 1.2)).toBe(false);
    });

    it('should return false for falsy scenarios when comparing different data types', () => {
        expect(isEqual('123', 123)).toBe(false);
        expect(isEqual('0', 0)).toBe(false);

        expect(isEqual('true', true)).toBe(false);
        expect(isEqual('false', false)).toBe(false);

        expect(isEqual('hello', null)).toBe(false);
        expect(isEqual('world', undefined)).toBe(false);

        expect(isEqual(1, true)).toBe(false);
        expect(isEqual(0, false)).toBe(false);

        expect(isEqual(42, null)).toBe(false);
        expect(isEqual(3.14, undefined)).toBe(false);

        expect(isEqual(true, null)).toBe(false);
        expect(isEqual(false, undefined)).toBe(false);

        expect(isEqual('hello', {})).toBe(false);
        expect(isEqual(1, {})).toBe(false);
        expect(isEqual(true, {})).toBe(false);
        expect(isEqual(null, {})).toBe(false);
        expect(isEqual(undefined, {})).toBe(false);

        expect(isEqual('hello', [])).toBe(false);
        expect(isEqual(1, [])).toBe(false);
        expect(isEqual(true, [])).toBe(false);
        expect(isEqual(null, [])).toBe(false);
        expect(isEqual(undefined, [])).toBe(false);
        expect(isEqual(NaN, [])).toBe(false);

        expect(isEqual(NaN, 123)).toBe(false);
        expect(isEqual(NaN, 'hello')).toBe(false);
        expect(isEqual(NaN, true)).toBe(false);
        expect(isEqual(NaN, null)).toBe(false);
        expect(isEqual(NaN, undefined)).toBe(false);
        expect(isEqual(NaN, {})).toBe(false);

        expect(isEqual({}, [])).toBe(false);
        // expect(isEqual([], {})).toBe(false); TODO: Need to fix this
    });

    it('should return true when all objects are equal', () => {
        expect(isEqual({ key: 'value' }, { key: 'value' })).toBe(true);
        expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
        expect(isEqual({ nested: { key: 'value' } }, { nested: { key: 'value' } })).toBe(true);
        expect(isEqual({ array: [1, 2, 3] }, { array: [1, 2, 3] })).toBe(true);
        expect(isEqual({ array: [1, 2, 3] }, { array: [3, 2, 1] })).toBe(true);
        expect(isEqual({ array: [1, 2, { nested: 'value' }] }, { array: [1, 2, { nested: 'value' }] })).toBe(true);
    });

    it('should return false when all objects are not equal', () => {
        expect(isEqual({ key: 'value' }, { key: 'value', differentKey: 'value' })).toBe(false);
        expect(isEqual({ key: 'value' }, { key: 'different value' })).toBe(false);
        expect(isEqual({ key: 'value' }, { differentKey: 'value' })).toBe(false);
        expect(isEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
        expect(isEqual({ nested: { key: 'value' } }, { nested: { differentKey: 'value' } })).toBe(false);
        expect(isEqual({ nested: { key: 'value' } }, { nested: { key: 'different value' } })).toBe(false);
        expect(isEqual({ array: [1, 2, 3] }, { array: [1, 2, 4] })).toBe(false);
        expect(isEqual({ array: [1, 2, { nested: 'value' }] }, { array: [1, 2, { nested: 'different' }] })).toBe(false);
        expect(isEqual({ array: [1, 2, { nested: 'value' }] }, { array: [1, 2, { different: 'value' }] })).toBe(false);
    });

    it('should return true when all arrays are equal', () => {
        expect(isEqual([null], [null])).toBe(true);
        expect(isEqual([null, null], [null, null])).toBe(true);
        expect(isEqual([undefined], [undefined])).toBe(true);
        expect(isEqual([undefined, undefined], [undefined, undefined])).toBe(true);
        expect(isEqual([null, undefined], [null, undefined])).toBe(true);
        expect(isEqual([], [])).toBe(true);
        expect(isEqual([1], [1])).toBe(true);
        expect(isEqual([1, 2], [1, 2])).toBe(true);
        expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(isEqual([1, 2, 3], [3, 2, 1])).toBe(true);
        expect(isEqual([], [], [])).toBe(true);
        expect(isEqual([1], [1], [1])).toBe(true);
        expect(isEqual([1, 2], [1, 2], [1, 2])).toBe(true);
        expect(isEqual([1, 2, 3], [1, 2, 3], [1, 2, 3])).toBe(true);
        expect(isEqual(['1'], ['1'])).toBe(true);
        expect(isEqual(['1', '2'], ['1', '2'])).toBe(true);
        expect(isEqual(['1', '2', '3'], ['1', '2', '3'])).toBe(true);
        expect(isEqual(['1', '2', '3'], ['3', '2', '1'])).toBe(true);
        expect(isEqual(['1'], ['1'], ['1'])).toBe(true);
        expect(isEqual(['1', '2'], ['1', '2'], ['1', '2'])).toBe(true);
        expect(isEqual(['1', '2', '3'], ['1', '2', '3'], ['1', '2', '3'])).toBe(true);
        expect(isEqual(['1', 2, 3], ['1', 2, 3])).toBe(true);
        expect(isEqual(['1', 2, 3], [3, 2, '1'])).toBe(true);
    });

    it('should return false when all arrays are not equal', () => {
        expect(isEqual([], [], [1])).toBe(false);
        expect(isEqual([1], [], [])).toBe(false);
        expect(isEqual([1], [], [1])).toBe(false);
        expect(isEqual([], [], ['1'])).toBe(false);
        expect(isEqual(['1'], [], [])).toBe(false);
        expect(isEqual(['1'], [], ['1'])).toBe(false);
        expect(isEqual([1], [1], [2])).toBe(false);
        expect(isEqual([2], [1], [1])).toBe(false);
        expect(isEqual([1], [2], [3])).toBe(false);
        expect(isEqual(['1'], ['1'], ['2'])).toBe(false);
        expect(isEqual(['2'], ['1'], ['1'])).toBe(false);
        expect(isEqual(['1'], ['2'], ['3'])).toBe(false);
        expect(isEqual(['1'], [1], [1])).toBe(false);
        expect(isEqual([1], [1], [1, 2])).toBe(false);
        expect(isEqual([1, 2], [1, 2], [1])).toBe(false);
        expect(isEqual([1, 2, 3], [1, 2, 3], [1, 2, 4])).toBe(false);
        expect(isEqual([1, 2, 3], [4, 5, 6], [4, 5, 6])).toBe(false);
        expect(isEqual(['1'], ['1'], ['1', '2'])).toBe(false);
        expect(isEqual(['1', '2'], ['1', '2'], ['1'])).toBe(false);
        expect(isEqual(['1', '2'], [1, 2], ['1', '2'])).toBe(false);
        expect(isEqual(['1', '2', '3'], ['1', '2', '3'], ['1', '2', '4'])).toBe(false);
        expect(isEqual(['1', '2', '3'], ['4', '5', '6'], ['4', '5', '6'])).toBe(false);
        expect(isEqual(['1', '2', '3'], [1, 2, 3], ['1', '2', '3'])).toBe(false);
    });

    it('should return false when first value is null and second value is an object', () => {
        expect(isEqual(null, { a: 'a', b: 'b' })).toBe(false);
    });

    it('should return false when first value is an object and second value is null', () => {
        expect(isEqual(null, { a: 'a', b: 'b' })).toBe(false);
    });
});
