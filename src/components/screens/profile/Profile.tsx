import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeData, User, USER_KEY, USER_TOKEN} from 'shared';
import {updateUser} from 'src/mutations';
import {LOGIN, TOKEN, USER} from '../../../../sclice/crudSclice';

export const Profile = () => {
  const dispatch = useDispatch();
  const user: User | null = useSelector(state => (state as any).quotes.user);
  const token: string | null = useSelector(
    state => (state as any).quotes.token,
  );
  const [name, setName] = useState<string>('');
  const [passWord, setPassword] = useState<string>('');

  const handleUpdate = () => {
    if (user && token) {
      const data = {
        ...user,
        body: {
          ...user.body,
          name,
          password: passWord,
        },
      };
      updateUser(data, token)
        .then(updatedUser => {
          if (updatedUser) {
            dispatch(USER(updatedUser));
            Alert.alert('Update successful.');
          }
        })
        .catch(() => {
          Alert.alert('Update fail.');
        });
    }
  };

  const handleLogout = () => {
    removeData(USER_KEY);
    removeData(USER_TOKEN);
    dispatch(USER(null));
    dispatch(LOGIN(false));
    dispatch(TOKEN(null));
  };

  useEffect(() => {
    if (user) {
      setName(user.body.name);
      setPassword(user.body.password);
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldTitle}>Username</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={user?.body.userName}
            style={styles.textInput}
            editable={false}
          />
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldTitle}>Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={[styles.textInput]}
          />
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldTitle}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={passWord}
            onChangeText={setPassword}
            style={styles.textInput}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <View style={[styles.fieldContainer, styles.btn]}>
          <Button onPress={handleUpdate} title={'Update'} />
        </View>
        <View style={[styles.fieldContainer, styles.btn, styles.logout]}>
          <Button onPress={handleLogout} title={'Logout'} color={'#e82929'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginTop: '40%',
  },
  fieldContainer: {
    width: '90%',
    alignSelf: 'center',
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
    height: 40,
  },
  textInput: {
    textAlignVertical: 'center',
    height: 40,
    backgroundColor: '#e4e4e7',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  btnContainer: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 25,
  },
  btn: {
    backgroundColor: 'rgba(15, 134, 221, 0.1)',
    borderRadius: 5,
  },
  logout: {
    backgroundColor: 'rgba(232, 41, 41, 0.1)',
  },
});
