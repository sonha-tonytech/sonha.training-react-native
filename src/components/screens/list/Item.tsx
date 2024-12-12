import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getFirstNameUser, ItemData, User} from '../../../../shared';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {format} from 'date-fns';

type ItemProps = {
  item: ItemData;
  user?: User;
  onClickShowModal: (id?: string, mode?: 'add' | 'edit' | 'delete') => void;
};

export const Item = ({item, user, onClickShowModal}: ItemProps) => {
  return (
    <View key={item.id} style={styles.itemContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitle}>{item.body.title}</Text>
          <FontAwesome
            name={'edit'}
            size={16}
            color={'black'}
            onPress={onClickShowModal.bind(this, item.id, 'edit')}
          />
          <AntDesign
            name={'delete'}
            size={16}
            color={'red'}
            onPress={onClickShowModal.bind(this, item.id, 'delete')}
          />
        </View>
        <View style={styles.userContainer}>
          <Text style={styles.userItem}>
            {getFirstNameUser(user?.body.name ?? '')}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.userItem}>
            {format(new Date(item.body.updateAt), 'MMM dd. hh:mmaaaaa')}
          </Text>
        </View>
      </View>
      <View style={styles.line} />
      <Text style={styles.itemDescription}>{item.body.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 14,
    fontWeight: '400',
  },
  itemContainer: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  userItem: {
    fontSize: 12,
    color: '#969696',
  },
  itemTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    backgroundColor: '#969696',
  },
});
