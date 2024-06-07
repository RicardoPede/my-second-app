import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import TaskServices from '../../services/task.services'
import { List } from 'react-native-paper'

const index = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await TaskServices.getTasks();
                setTasks(tasks);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTasks();
    }, []);

    const handlePress = (screen) => () => {
        console.log('press screen', screen);
        router.navigate(screen)
    }

    const getDateToString = (date) => {
        const newDate = new Date(date);
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
    }

    return (
        <View style={styles.container}>
            <CustomButton
                title="Menu"
                handlePress={handlePress('/home')}
            />
            <CustomButton
                title="Create Task"
                handlePress={handlePress('/create-task')}
            />
            <Text style={styles.title}>List Task</Text>
            {tasks && (
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => (
                        <List.Accordion
                            style={styles.accordion}
                            title={item.title}
                            description={item.description}
                            descriptionStyle={styles.itemDescription}
                            left={(props) => <List.Icon {...props} icon="folder" />}
                        >
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.itemDescription}>{item.status}</Text>
                                <Text style={styles.itemCreatedAt}>
                                    Creado el {getDateToString(item.created_at)}
                                </Text>
                                <View style={styles.buttonContainer}>
                                    <CustomButton 
                                        title="Edit"
                                        handlePress={() => Alert.alert('Edit', 'Edit Task')}
                                    />
                                    <CustomButton 
                                        title="Delete"
                                        handlePress={() => Alert.alert('Delete', 'Delete Task')}
                                    />
                                </View>
                            </View>
                        </List.Accordion>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    accordion: {
        display: 'flex',
        width: 355,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        borderColor: 'gray',
        borderWidth: 1
    },
    descriptionContainer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        width: 355,
    },
    itemDescription: {
        fontSize: 16
    },
    itemCreatedAt: {
        fontSize: 12,
        color: 'gray'
    },
    buttonContainer: {
        flexDirection: 'row',
        display: 'flex',
        width: '50%',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5,
        gap: 10,

    }
})