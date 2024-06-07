import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageBackground } from 'react-native'
import SearchInput from '@/components/Searchinput'
import { FontAwesome } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { useGlobalContext } from '@/context/GlobalProvider'
import { router } from 'expo-router'

const index = () => {

  const { user, inLoading, isLoggedIn } = useGlobalContext()

  const handlePress = () => {
    router.navigate("/list-task")
  }

  return (
    <SafeAreaView>
      <ImageBackground source={require('@/assets/images/fond.png')} style={{ width: '100%', height: '100%' }}>
        <View style={{ backgroundColor: 'rgba(103, 80, 164, 1)', padding: 10 }}>
          <FlatList
            data={[{ id: 0, user: user ? user.username : '' }, { id: 1, title: 'Item 1' }, { id: 2, title: 'Item 2' }]}
             renderItem={({ item }) => (
              <View>
                <Text>{item.title}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <View style={style.header}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={{ width: '180%', height: 100 }}
                  resizeMode='contain'
                />
                <Text style={style.headerTitle}>Bienvenido{ user ? `, ${user.username}` : `: Invitado`} </Text>
              </View>
            }
            ListFooterComponent={
              <View>
                <Text>Footer</Text>
              </View>
            }
            ListEmptyComponent={
              <View>
                <Text>Empty</Text>
              </View>
            }
            ItemSeparatorComponent={() => (
              <View>
                <Text>Separator</Text>
              </View>
            )}
          >
          </FlatList>
          <Text>Home</Text>
          <View>
            <SearchInput
              title='Search'
              value=''
              placeholder='Search for a product...'
              handleChangeText={() => { }}
              otherStyles={style.input}
            >
              <View>
                <FontAwesome name='search' size={24} color='black' />
                <FontAwesome name="home" size={30} color="#000" />
              </View>
              <SearchInput />
            </SearchInput>
          </View>
        </View>
        <CustomButton
          title='Task'
          handlePress={handlePress}
          isLoading={false}
        >

          <Text>Task</Text>
        </CustomButton>

      </ImageBackground>
    </SafeAreaView >
  )
}

export default index

const style = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(103, 80, 164, 1)',
    padding: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
})