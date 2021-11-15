import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Linking, ScrollView, Button } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as RootNavigation from '../../redux/navigation';

export function DetailedPage(props: DetailedProps) {
    const returnHandler = () => {
        RootNavigation.navigate('Home')
    }

    const procedeToYoutube = () => {
        Linking
            .openURL(youtubeUrl)
    }

    const goToAffiliate = () => {

    }
    
    const { title, isYoutube, notFound, imgSrc, youtubeUrl, year, description, duration, genres, directedBy, actors } = props.route.params

    let newTitle = <Text style={styles.title}>Nothing found</Text>
    if (!notFound) {
        if (isYoutube) {
            newTitle = <View>
                <Text style={styles.title}>Found on Youtube</Text>
                <Text style={styles.title2}>{ '\n' + title}</Text>
            </View>
        } else {
            newTitle = <Text style={[styles.title, { paddingBottom: '2%' }]}>{ title }</Text>
        }

    }
    let newImage = <Image style={styles.image} source={{ uri: imgSrc }} />
    if (isYoutube) {
        newImage = <TouchableOpacity style={styles.container} onPress={procedeToYoutube}>
            <ImageBackground
              source={{ uri: imgSrc }} style={styles.backgroundImage}>

            <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}> 
                <Image source={require('../../assets/youtubePlayBtn.png')} />
            </View>

            </ImageBackground>
        </TouchableOpacity>
    } else {
        newImage = <Image style={styles.normalImg} source={{ uri: imgSrc }} />
    }

    let body = <View style={styles.notFound}>
        { newTitle }
    </View>

    if (!notFound) {
        if (isYoutube) {
            body = <ScrollView>
                { newTitle }
                { newImage }
            </ScrollView>
        } else {
            body = <ScrollView>
                <View style={styles.center}>
                    { newTitle }
                    { newImage }
                </View>

                <View style={styles.affiliateBtn}><Button title="Watch online" onPress={goToAffiliate}></Button></View>

                <View style={styles.filmData}>
                    <Text style={styles.textSection}><Text style={styles.bold}>Year(s): </Text>{ year }</Text>
                    <Text style={[styles.textSection, styles.description]}>{ description }</Text>
                    <Text style={styles.textSection}><Text style={styles.bold}>Duration: </Text>{ duration }</Text>
                    <Text style={styles.textSection}><Text style={styles.bold}>Genres: </Text>{ genres }</Text>
                    <Text style={styles.textSection}><Text style={styles.bold}>Directed by: </Text>{ directedBy }</Text>
                    <Text style={styles.textSection}><Text style={styles.bold}>Actors: </Text>{ actors }</Text>
                </View>
            </ScrollView>
        }

    }

    return <View style={[styles.detailedPage, notFound ? null : styles.justifyContent, !isYoutube && !notFound ? styles.paddingTop2 : styles.paddingTop]}>
            <TouchableOpacity style={styles.backBtn} onPress={returnHandler}>
                <Image  source={ require('../../assets/backtick.png') } />
            </TouchableOpacity>
            { body }
        </View>
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
    },
    affiliateBtn: {
        marginTop: '10%',
        marginBottom: '5%'
    },
    textSection: {
        fontSize: 17,
    },
    description: {
        fontStyle: 'italic',
        marginVertical: '5%'
    },
    filmData: {
        margin: '5%'
    },
    bold: {
        fontWeight: 'bold',
    },
    normalImg: {
        width: wp('80%'),
        height: hp('60%'),
    },
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        opacity: 0.5,
        width: wp('90%'),
        height: hp('30%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {},
    backBtn: {
        position: 'absolute',
        right: '80%',
        top: '5%',
        padding: '5%',

        borderColor: 'red',
        borderWidth: 1
    },
    buttons: {
        marginBottom: -80
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    title2: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    justifyContent: {
        justifyContent: 'center',
    },
    notFound: {
        marginTop: '25%'
    },
    paddingTop: {
        paddingTop: '25%',
    },
    paddingTop2: {
        paddingTop: '10%',
    },
    detailedPage: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
})

interface DetailedProps {
    route: {
        params: {
            title: string;
            youtubeTitle: string;
            isYoutube: boolean;
            notFound: boolean;
            imgSrc: string;
            youtubeUrl: string;
            year: string;
            description: string;
            duration: string;
            genres: string;
            directedBy: string;
            actors: string;
        }
    }
}
