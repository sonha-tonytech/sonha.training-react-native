import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {getLoginUser} from 'src/queries';
import {useDispatch} from 'react-redux';
import {LOGIN, TOKEN, USER} from '../../../../sclice/crudSclice';
import {storeData, USER_TOKEN, USER_KEY} from 'shared';

export const Login = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>('');
  const [passWord, setPassword] = useState<string>('');

  const handleLogin = () => {
    getLoginUser({
      userName,
      password: passWord,
    })
      .then(loginUser => {
        if (loginUser !== undefined) {
          //Session will storage in 3 days = 259200000 mil
          storeData(USER_TOKEN, JSON.stringify(loginUser.token), 259200000)
            .then(() => {
              dispatch(TOKEN(loginUser.token));
            })
            .catch(err => console.log(err));

          storeData(USER_KEY, JSON.stringify(loginUser.user), 259200000)
            .then(() => {
              dispatch(USER(loginUser.user));
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
            autoCapitalize="none"
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
            autoCapitalize="none"
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
