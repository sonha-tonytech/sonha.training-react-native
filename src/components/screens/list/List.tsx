import React, {useCallback, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  CREATED_DATA,
  createQuote,
  DELETE_DATA,
  deleteQuote,
  DETAILS,
  getData,
  getPaginationSkipValue,
  handleShowModal,
  ItemData,
  NETWORD_ERROR,
  storeData,
  UPDATED_DATA,
  updateQuote,
  User,
} from 'shared';
import {createPost, deletePost, updatePost} from 'src/mutations';
import {getAllLists} from 'src/queries';
import {GET_DATA} from '../../../../sclice/crudSclice';
import {Item} from './Item';
import {AddEditItemModal} from './AddEditItemModal';
import {DeleteItemModal} from './DeleteItemModal';
import uuid from 'react-native-uuid';
import {CircleLoader} from 'src/components/cores/loadings/circle-loader';

export const List = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const data: ItemData[] = useSelector(state => (state as any).quotes.list);
  const user: User | null = useSelector(state => (state as any).quotes.user);
  const token: string | null = useSelector(
    state => (state as any).quotes.token,
  );
  const isOpen: boolean = useSelector(state => (state as any).quotes.modalOpen);
  const loading: boolean = useSelector(state => (state as any).quotes.loading);
  const [page, setPage] = useState<number>(1);
  const [hasData, setHasData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [showModalControl, setShowModalControl] = useState<{
    mode: 'add' | 'edit' | 'delete';
    item?: ItemData;
  }>();
  const limit = 15;

  const onClickShowModal = (id?: string, mode?: 'add' | 'edit' | 'delete') => {
    const item = data.find(i => i.id === id);
    setShowModalControl({
      mode: mode ?? 'add',
      item,
    });
    handleShowModal(dispatch, true);
  };

  const onClickCloseModal = () => {
    setShowModalControl(undefined);
    handleShowModal(dispatch, false);
  };

  const onClickShowItemDetails = (item: ItemData) => {
    navigation.navigate(DETAILS, {itemId: item.id});
  };

  const handleSave = (body: ItemData) => {
    if (showModalControl && token) {
      const {mode} = showModalControl;
      if (mode === 'add') {
        createPost(body, token).then(value => {
          if (value === NETWORD_ERROR) {
            const id = uuid.v4();
            const newData = {
              ...body,
              id,
            };
            getData(CREATED_DATA).then(element => {
              const createdItems: ItemData[] = element
                ? JSON.parse(element)
                : [];
              storeData(
                CREATED_DATA,
                JSON.stringify([...createdItems, newData]),
              );
              createQuote(dispatch, newData);
            });
          } else if (typeof value !== 'string') {
            createQuote(dispatch, value);
          }
        });
      }
      if (mode === 'edit') {
        updatePost(body, token).then(value => {
          const updatedItem: ItemData = {
            ...body,
            body: {
              ...body.body,
              user: user ?? body.body.user,
            },
          };
          if (value === NETWORD_ERROR) {
            getData(UPDATED_DATA).then(element => {
              const updatedItems: ItemData[] = element
                ? JSON.parse(element)
                : [];
              storeData(
                UPDATED_DATA,
                JSON.stringify([...updatedItems, updatedItem]),
              );
            });
          }
          updateQuote(dispatch, updatedItem);
        });
      }
      if (mode === 'delete') {
        deletePost({id: body.id}, token).then(value => {
          if (value === NETWORD_ERROR) {
            getData(DELETE_DATA).then(element => {
              const deleteItemIds: string[] = element
                ? JSON.parse(element)
                : [];
              storeData(
                DELETE_DATA,
                JSON.stringify([...deleteItemIds, body.id]),
              );
            });
          }
          deleteQuote(dispatch, body.id);
        });
      }
      onClickCloseModal();
    }
  };

  const handleFetchData = useCallback(() => {
    if (hasData && token) {
      setIsLoading(true);
      const newPage = page + 1;
      setPage(newPage);
      getAllLists(
        {
          _start:
            getPaginationSkipValue({
              page: newPage,
              take: limit,
            }) + 1,
          _limit: limit,
        },
        token,
      ).then(posts => {
        if (posts && posts.length > 0) {
          dispatch(GET_DATA([...data, ...posts]));
        } else {
          setHasData(false);
        }
      });
      setIsLoading(false);
    }
  }, [data, hasData, page, token, dispatch]);

  return (
    <>
      <CircleLoader show={isLoading} />
      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}>
            This is Tony's list
          </Text>
          <Button
            title="Create"
            onPress={onClickShowModal.bind(this, undefined, undefined)}
          />
        </View>

        <FlatList
          data={data}
          renderItem={({item}) => (
            <Item
              item={item}
              onClickShowModal={onClickShowModal}
              onClickShowItemDetails={onClickShowItemDetails}
            />
          )}
          keyExtractor={(item: ItemData) => item.id}
          scrollEnabled
          onEndReached={handleFetchData}
          onEndReachedThreshold={0.7}
          style={styles.listContainer}
        />
        <AddEditItemModal
          isOpen={isOpen && showModalControl?.mode !== 'delete'}
          isLoading={loading}
          item={showModalControl?.item}
          userId={user?.id}
          handleSave={handleSave}
          handleClose={onClickCloseModal}
        />

        {showModalControl?.item && (
          <DeleteItemModal
            isOpen={isOpen && showModalControl?.mode === 'delete'}
            item={showModalControl?.item}
            handleDelete={handleSave}
            handleClose={onClickCloseModal}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingRight: 10,
  },
  sectionContainer: {
    marginTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 45,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
