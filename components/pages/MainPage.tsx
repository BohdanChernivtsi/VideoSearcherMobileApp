import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNFS from 'react-native-fs';

import { RecordButton } from '../RecordButton';
import { getResults } from '../../redux/getResults';

export default function MainPage() {
    return (<View style={styles.mainPage}>
        <Text style={styles.header}>Video Searcher</Text>

        <View style={styles.buttons}>
            <RecordButton></RecordButton>
            <View style={styles.b}>
                <Button title="Upload videoclip" onPress={onUpload}></Button>
            </View>
        </View>
    </View>)
}

async function onUpload() {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }) as any;

     console.log(RNFS);      
      
    // RNFS.readFile(result.uri, 'base64')
    //   .then(res =>{
    //     console.log(res);
    // });
  
      getResults()
}

const styles = StyleSheet.create({
    buttons: {        
        // borderColor: 'red',
        // borderWidth: 1,
        marginBottom: -80
    },
    b: {
        // borderColor: 'red',
        // borderWidth: 1,
    },
    mainPage: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        paddingBottom: '50%',
    },
    header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
      }
})