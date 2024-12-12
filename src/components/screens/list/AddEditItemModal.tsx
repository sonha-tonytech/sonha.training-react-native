import {StyleSheet, View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppModal} from '../../cores/modals/Modal';
import {ItemData} from '../../../../shared';

type AddEditItemModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  item?: ItemData;
  userId?: string;
  handleSave: (item: ItemData) => void;
  handleClose: () => void;
};

export const AddEditItemModal = ({
  isOpen,
  isLoading,
  item,
  userId,
  handleSave,
  handleClose,
}: AddEditItemModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  const handleCloseModal = () => {
    handleClose();
    setTitle('');
    setText('');
  };

  const handleUpdate = () => {
    const now = new Date();
    const data = {
      id: item?.id ?? '0',
      body: {
        text,
        title,
        updateAt: now.toISOString(),
        userId: userId ?? '',
      },
    };
    if (text && title) {
      handleSave(data);
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (item) {
      setTitle(item.body.title);
      setText(item.body.text);
    }
  }, [item]);
  return (
    <AppModal
      isOpen={isOpen}
      isLoading={isLoading}
      handleSave={handleUpdate}
      handleClose={handleCloseModal}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldTitle}>Title</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={[styles.input, styles.nameInput]}
          />
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldTitle}>Text</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={10}
            style={[styles.input, styles.textInput]}
          />
        </View>
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  fieldTitle: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  input: {padding: 5, color: 'black'},
  nameInput: {
    height: 50,
  },
  textInput: {
    textAlignVertical: 'top',
    height: 100,
  },
});
