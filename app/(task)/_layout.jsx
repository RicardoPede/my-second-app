import { Tabs } from 'expo-router'

const ToDoLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='list-task'
        options={{ title: 'List Task' }}
      />

      <Tabs.Screen
        name='create-task'
        options={{ title: 'Create Task' }}
      />
    </Tabs>
  )
}

export default ToDoLayout