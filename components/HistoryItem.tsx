import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';

import * as RootNavigation from '../redux/navigation';

export default function HistoryPage(props: HistoryPageProps) {
    let dateElement = props.searchDate ? <Text style={styles.searchedDate}>Search date: { props.searchDate }</Text>
        : <Text style={styles.searchedDate}>Year: { props.year }</Text>

    let pressHandler = () => {
        RootNavigation.navigate('Detailed', {
            // title: 'Чичваркин. Путин, финансирование Навального, Ходорковский, Лукашенко. В гостях у Гордона',
            isYoutube: false,
            notFound: false,
            // imgSrc: 'https://i.ytimg.com/vi/spgkRD59uss/hq720.jpg',
            imgSrc: 'https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
            youtubeUrl: 'https://www.youtube.com/watch?v=spgkRD59uss',
            title: 'Pirates of the carribian, of the carribian',
            
            
            year: '(2017)',
            description: 'The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of “Avengers: Endgame.”',
            duration: '134 min',
            genres: 'Animation, Adventure, Comedy',
            directedBy: ' - ',
            actors: 'Tom Hiddleston, Owen Wilson, Gugu Mbatha-Raw, Sophia Di Martino'
        })
    }    

    return (<TouchableOpacity key={props.id} style={styles.historyItem} onPress={pressHandler}>
        <View style={styles.mainSection}>
            <Image style={styles.image} source={ require('../assets/movie.jpg') } />
            <Text style={styles.title}>{ props.title }</Text>
        </View>
        
        { dateElement }
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    historyItem: { 
        flex: 1,
        width: '100%',
        height: 130,
        alignItems: 'center',
        justifyContent: 'space-between',

        // borderColor: 'red',
        // borderWidth: 1
     },
     mainSection: {
        flex: 3,
        flexDirection: 'row',
        paddingTop: 5,
        width: '100%',

        // borderColor: 'red',
        // borderWidth: 1
     },
    searchedDate: {
        flex: 1,
        // borderColor: 'red',
        // borderWidth: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flexShrink: 1,

        // borderColor: 'red',
        // borderWidth: 1
    },
    image: {
        width: '25%',
        height: '70%',
        borderRadius: 20,
        overflow: "hidden",
        marginRight: 10,

        // borderColor: 'red',
        // borderWidth: 1
    }
})

interface HistoryPageProps {
    id: number,
    title: string,
    searchDate?: string,
    year?: string // can be (2012 - 2015)
}
