import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import TaskServices from '../../services/task.services'
import { HelperText, TextInput } from 'react-native-paper'
import { Controller, useForm } from "react-hook-form";
import { useGlobalContext } from '@/context/GlobalProvider'

const CreateTask = () => {

  const { user } = useGlobalContext();
  console.log('user', user);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'pending',
      author: user ? user.username : 'anonymous',
      created_At: new Date(),
    }
  });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = async (data) => {
    console.log('data', data);
    try {
      TaskServices.createTask(data);
      router.navigate('/list-task');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Create Task</Text>
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
          title="Create Task"
          handlePress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  )
}

export default CreateTask

const styles = StyleSheet.create({})