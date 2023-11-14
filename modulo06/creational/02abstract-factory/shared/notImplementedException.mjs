export default class NotImplementedExcepetion extends Error {
    constructor(message) {
        super(`the "${message}" function was not implemented`)
        this.name = "NotImplementedExcepetion"
    }
}