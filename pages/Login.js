import React ,{useState}from 'react'
import {View , Text,Button,TextInput , StatusBar}  from 'react-native'

import auth from '@react-native-firebase/auth';

function Login() {

    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    return (
        <>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        <View style={{flex:1,backgroundColor:"#fff"}}>
     
            <Text style={{textAlign: 'center', paddingVertical: 20}}>Please login</Text>
            <View style={{padding: 10}}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    placeholder={'email@gmail.com'}
                    onChangeText={text => setEmail(text)}
                    value={email}

                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={text => setPassword(text)}
                    placeholder={'12345a#'}
                    value={password}
                    secureTextEntry={true}
                />

                <Button
                    title="Login"
                    onPress={() => {
                        doLogin(email, password)
                    }}
                />
          
        
        </View>
        </View>
        </>
    )
}

export default Login




function doLogin(email, password) {
    auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
            auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('account created')
                }).catch(error => {
                console.error(error);
            });
        })
    }
