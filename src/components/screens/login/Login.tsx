import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {getUsers} from '../../../queries';
import {useDispatch} from 'react-redux';
import {LOGIN, USER} from '../../../../sclice/crudSclice';
import {storeData, USER_KEY} from '../../../../shared';

export const Login = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>('');
  const [passWord, setPassword] = useState<string>('');

  const handleLogin = () => {
    getUsers()
      .then(data => {
        const loginUser = data?.find(
          user =>
            user.body.userName.toUpperCase() === userName.toUpperCase() &&
            user.body.pass.toUpperCase() === passWord.toUpperCase(),
        );
        if (loginUser !== undefined) {
          //Session will storage in 3 days = 259200000 mil
          storeData(USER_KEY, JSON.stringify(loginUser), 259200000)
            .then(() => {
              dispatch(USER(loginUser));
              dispatch(LOGIN(true));
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldTitle}>Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={userName}
            onChangeText={setUserName}
            style={styles.textInput}
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
      <View style={[styles.fieldContainer, styles.btn]}>
        <Button onPress={handleLogin} title={'Login'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginTop: '50%',
  },
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
    height: 40,
  },
  textInput: {
    textAlignVertical: 'center',
    height: 40,
  },
  btn: {
    backgroundColor: 'rgba(15, 134, 221, 0.1)',
    borderRadius: 5,
    marginTop: 25,
  },
});
