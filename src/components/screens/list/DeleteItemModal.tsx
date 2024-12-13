import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {AppModal} from 'src/components/cores/modals/Modal';
import {ItemData} from 'shared';

type DeleteItemModalProps = {
  isOpen: boolean;
  item: ItemData;
  handleDelete: (item: ItemData) => void;
  handleClose: () => void;
};

export const DeleteItemModal = ({
  isOpen,
  item,
  handleDelete,
  handleClose,
}: DeleteItemModalProps) => {
  return (
    <AppModal
      isOpen={isOpen}
      saveButtonLabel={'Delete'}
      saveButtonColor={'#e82929'}
      handleSave={handleDelete.bind(this, item)}
      handleClose={handleClose}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldTitle}>Are you sure to delete this post?</Text>
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
});
