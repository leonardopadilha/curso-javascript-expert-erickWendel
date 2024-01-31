import lokijs from 'lokijs';
import { randomUUID } from 'node:crypto';

export default class Service {
    #heroesTable
    constructor(dbname) {
        const db = new lokijs(dbname)
        this.#heroesTable = db.addCollection('characteres')
    }

    createHero(hero) {
        const items = this.#heroesTable.insert({
            id: randomUUID(),
            ...hero
        })

        return items;
    }

    listHeroes() {
        return this.#heroesTable.find()
    }
}