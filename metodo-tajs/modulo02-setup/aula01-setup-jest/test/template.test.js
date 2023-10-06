import { it } from '@jest/globals';

function sum(a, b) {
    return a + b + 2
}

it('sums two values', () => {
    expect(sum(10, 2)).toBe(12);
})