import { expect } from '../../test';

// testing auto-test generation.

// TODO: actual tests.

describe('a boatload of tests', () =>
    Array(10)
        .fill(1)
        .map((_, i) => i + 1)
        .map(n => it(`${n} should equal ${n}`, () => {
            return expect(n).to.be.eq(n);
        }))
);
