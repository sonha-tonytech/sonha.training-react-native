import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  CREATED_DATA,
  DELETE_DATA,
  DETAILS,
  getData,
  ItemData,
  LIST,
  storeData,
  UPDATED_DATA,
} from 'shared';
import {getAllLists} from 'src/queries';
import {createPost, deletePost, updatePost} from 'src/mutations';
import {GET_DATA} from '../../../../sclice/crudSclice';
import {CircleLoader} from 'src/components/cores/loadings/circle-loader';
import {useDispatch, useSelector} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export const Dashboard = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const data: ItemData[] = useSelector(state => (state as any).quotes.list);
  const [isLoading, setIsLoading] = useState(false);
  const [randomItem, setRandomItem] = useState<ItemData>();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const limit = 15;

  useEffect(() => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setRandomItem(data[randomIndex]);
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(true);
    getAllLists({
      _start: 0,
      _limit: limit,
    }).then(async posts => {
      if (posts && posts.length > 0) {
        let _post = [...posts];

        // Create storage data
        await getData(CREATED_DATA).then(async values => {
          const createdItems: ItemData[] = values ? JSON.parse(values) : [];
          if (createdItems.length > 0) {
            const newCreatedItems = await Promise.all(
              createdItems.map(item => createPost(item)),
            );
            await storeData(CREATED_DATA, JSON.stringify([]));

            _post = [..._post, ...(newCreatedItems as ItemData[])];
          }
        });

        // Update storage data
        await getData(UPDATED_DATA).then(async values => {
          const updatedItems: ItemData[] = values ? JSON.parse(values) : [];
          if (updatedItems.length > 0) {
            await Promise.all(updatedItems.map(item => updatePost(item)));
            await storeData(UPDATED_DATA, JSON.stringify([]));

            _post = _post.map(item => {
              const findUpdatedItem = updatedItems.find(
                element => element.id === item.id,
              );
              return findUpdatedItem ?? item;
            });
          }
        });

        // Delete storage data
        await getData(DELETE_DATA).then(async values => {
          const deleteItemIds: string[] = values ? JSON.parse(values) : [];
          if (deleteItemIds.length > 0) {
            await Promise.all(deleteItemIds.map(id => deletePost({id})));
            await storeData(DELETE_DATA, JSON.stringify([]));

            _post = _post.filter(item => !deleteItemIds.includes(item.id));
          }
        });

        dispatch(
          GET_DATA(
            _post.sort(
              (a, b) =>
                (new Date(b.body.updateAt).getTime() || 0) -
                (new Date(a.body.updateAt).getTime() || 0),
            ),
          ),
        );
      }
    });
    setIsLoading(false);
  }, [dispatch]);

  return (
    <>
      <CircleLoader show={isLoading} />

      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Image
              style={styles.logo}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            <View style={styles.sectionContainer}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: isDarkMode ? Colors.white : Colors.black,
                  },
                ]}>
                YSM
              </Text>
              <Text
                style={[
                  styles.sectionDescription,
                  {
                    color: isDarkMode ? Colors.light : Colors.dark,
                  },
                ]}>
                Hello World
              </Text>
            </View>
            <Button
              title="Go to YSM's list"
              onPress={() => navigation.navigate(LIST)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <View
        style={[
          styles.randomItemContainer,
          {
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          },
        ]}>
        <View>
          <Text style={[styles.sectionTitle]}>
            {randomItem?.body.title ?? null}
          </Text>
          <Text style={[styles.sectionDescription]}>
            {randomItem?.body.text ?? null}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() =>
            navigation.navigate(DETAILS, {itemId: randomItem?.id})
          }>
          <Text style={styles.link}>Details</Text>
          <SimpleLineIcons name={'arrow-right'} color={'#2196F3'} size={12} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  logo: {
    width: '100%',
    height: 150,
  },
  randomItemContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  link: {
    color: '#2196F3',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
