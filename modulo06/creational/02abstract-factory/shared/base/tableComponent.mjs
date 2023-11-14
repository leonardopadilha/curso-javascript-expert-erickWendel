import NotImplementedExcepetion from "../notImplementedException.mjs";

export default class TableComponent {
    render(data) {
        throw new NotImplementedExcepetion(this.render.name)
    }
}