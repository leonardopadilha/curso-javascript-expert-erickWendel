import NotImplementedExcepetion from "../notImplementedException.mjs";

export default class ViewFactory {
    createdTable() {
        throw new NotImplementedExcepetion(this.createdTable.name);
    }
}