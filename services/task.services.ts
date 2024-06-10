import task from '@/assets/data/task.json'

export const TaskServices = {
    getTasks: () => {
        const newTasks = task.map((t) => {
            return {
                id: t.id,
                title: t.title,
                description: t.description,
                status: t.status
            }
        })
        return newTasks
    },

    getTask: (id: number) => {
        const taskId = task.find((t) => t.id === id)
        if (taskId) {
            return taskId
        }
    },

    createTask: (title: string, description: string, status: string, author: string) => {
        const newTask = {
            id: task.length + 1,
            title,
            description,
            status,
            author,
            created_at: new Date().toISOString(),
        }
        task.push(newTask)
        return newTask
    },
}

