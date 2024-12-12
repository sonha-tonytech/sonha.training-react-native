import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  Button,
} from 'react-native';
import React from 'react';

type AppModalProps = React.PropsWithChildren & {
  isOpen: boolean;
  isLoading?: boolean;
  saveButtonLabel?: string;
  saveButtonColor?: string;
  handleSave: () => void;
  handleClose: () => void;
};

export const AppModal = ({
  isOpen,
  isLoading = false,
  children,
  saveButtonLabel = 'Save',
  saveButtonColor,
  handleSave,
  handleClose,
}: AppModalProps) => {
  return (
    <Modal transparent visible={isOpen} animationType="slide">
      <Pressable
        onPress={handleClose}
        style={[StyleSheet.absoluteFill, styles.pressable]}
      />

      <View style={styles.modalCard}>
        {children}
        <View style={styles.btn}>
          {!isLoading ? (
            <View style={styles.btnController}>
              <Button
                onPress={handleClose}
                title={'Cancel'}
                color={'#737373'}
              />
              <Button
                onPress={handleSave}
                title={saveButtonLabel}
                color={saveButtonColor}
              />
            </View>
          ) : (
            <ActivityIndicator
              style={styles.status}
              size={30}
              color={'#737373'}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btnController: {
    flexDirection: 'row',
  },
  btn: {
    width: 130,
    height: 40,
    marginVertical: 20,
    alignSelf: 'flex-end',
    borderRadius: 5,
    marginRight: 18,
    justifyContent: 'flex-end',
  },
  modalCard: {
    width: '90%',
    zIndex: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 20,
    marginVertical: 'auto',
  },
  pressable: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  status: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
});
