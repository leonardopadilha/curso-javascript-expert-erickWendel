class PetStore {
    async makeRequest(url) {
        return (await fetch(url)).json()
    }

    async getPet(url) {
        const data = await this.makeRequest(url)
        return {
            type_animal: data.category.name,
            name: data.name,
            status: data.status
        }
    }
}

module.exports = PetStore