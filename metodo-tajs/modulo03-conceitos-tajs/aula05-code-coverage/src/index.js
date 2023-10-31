import { Task } from "./task.js";

const ONE_SECOND = 1000
const RUN_IN_A_SEC = new Date(Date.now() + ONE_SECOND)
const RUN_IN_TW_SEC = new Date(Date.now() + ONE_SECOND * 2)
const RUN_IN_THREE_SEC = new Date(Date.now() + ONE_SECOND * 3)

const task = new Task();
task.save({
    name: 'task1',
    dueAt: RUN_IN_A_SEC,
    fn: () => console.log('task1 executed')
})

task.save({
    name: 'task2',
    dueAt: RUN_IN_TW_SEC,
    fn: () => console.log('task2 executed')
})

task.save({
    name: 'task3',
    dueAt: RUN_IN_THREE_SEC,
    fn: () => console.log('task3 executed')
})

task.run(ONE_SECOND)

