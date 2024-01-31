import { it, expect } from '@jest/globals'
import Service from '../src/service';

const s = new Service('heroes')
s.createHero({ name: 'leo' })
console.log(s.listHeroes())

function sum(a, b) {
    return a + b
}

it('sums two values', () => {
    expect(sum(2, 3)).toBe(5)
})