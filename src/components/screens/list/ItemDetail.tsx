import React, {useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DETAILS, ItemData, User} from 'shared';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {format} from 'date-fns';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getUsers } from 'src/queries';

export const ItemDetail = ({navigation, route}: any) => {
  const data: ItemData[] = useSelector(state => (state as any).quotes.list);
  const [item, setItem] = useState<ItemData>();
  const [user, setUser] = useState<User>();

  const handleNavigateToItemDetail = (id: string) => {
    if (id !== item?.id) {
      navigation.push(DETAILS, {itemId: id});
    }
  };

  useEffect(() => {
    const {itemId} = route.params;

    if (itemId) {
      const findItem = data.find(i => i.id === itemId);
      if (findItem) {
        setItem(findItem);
        getUsers().then(users => {
          const findUser = users?.find(u => u.id === findItem.body.userId);
          setUser(findUser);
        });
      }
    }
  }, [data, route.params]);
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView horizontal style={styles.scrollPosts}>
        {data.map(post => (
          <Button
            key={post.id}
            title={post.body.title}
            color={post.id === item?.id ? '#2196F3' : 'black'}
            onPress={handleNavigateToItemDetail.bind(this, post.id)}
          />
        ))}
      </ScrollView>
      <View style={styles.container}>
        <View style={styles.fieldContainer}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.description}>{item?.body.title ?? null}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>{item?.body.text ?? null}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.title}>Created At</Text>
          <Text style={styles.description}>
            {item?.body.updateAt
              ? format(new Date(item?.body.updateAt), 'MMM dd, yyyy hh:mm:ss')
              : null}
          </Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.title}>Created By</Text>
          <Text style={styles.description}>{user?.body.name ?? null}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btn}>
          <SimpleLineIcons name={'arrow-left'} color={'#2196F3'} size={16} />
          <Text style={styles.btnLabel}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollPosts: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    boxShadow:
      '0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08)',
  },
  wrapper: {
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 24,
  },
  fieldContainer: {
    gap: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 600,
  },
  description: {
    color: 'black',
    fontSize: 16,
  },
  btn: {
    position: 'absolute',
    left: 0,
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  btnLabel: {
    color: '#2196F3',
    fontSize: 16,
  },
});
