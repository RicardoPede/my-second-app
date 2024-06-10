import { View, Text } from 'react-native'
import React from 'react'
import TaskServices from '@/services/task.services'
import { useLocalSearchParams } from 'expo-router'
import { Controller } from 'react-hook-form'
import { HelperText, TextInput } from 'react-native-paper'

export default function EditTask() {
    const { id } = useLocalSearchParams

    const [ task, setTask ] = useState({
        title: '',
        description: '',
        status: 'pending',
        author: '',
        created_at: new Date(),
    })

    const fetchTask = async (id) => {
        const task = TaskServices.getTask(id)
        setTask(task)
        reset(task)
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: task
    })

    const hasErrors = Object.keys(errors).length > 0

    const onSubmit = async (data) => {
        try {
            TaskServices.updateTask(id, data)
            router.navigate('/list-task')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchTask(id)
    }, [])

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Edit Task</Text>
        <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                label="Title"
                keyboardType="default"
                autoCapitalize="sentences"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
            />
            )}
        />
        {errors.title && (
            <HelperText type="error" visible={hasErrors}>
            {errors.title?.message}
            </HelperText>
        )}
        <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                label="Description"
                keyboardType="default"
                autoCapitalize="sentences"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
            />
            )}
        />
        {errors.description && (
            <HelperText type="error" visible={hasErrors}>
            {errors.description?.message}
            </HelperText>
        )}
        <CustomButton
            title="Update Task"
            handlePress={handleSubmit(onSubmit)}
        />
    </View>
  )
}