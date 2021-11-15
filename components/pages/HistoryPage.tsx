import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import HistoryItem from '../HistoryItem';
import { ListComponent } from '../List';

interface HistoryProps {
    index: number
}

export default class HistoryPage extends React.Component {

    render() {
            let historyData = [{
                id: 1, 
                title: 'Pirates of the carribian, my the carribian',
                searchDate: '07/10/2021'
            }, {
                id: 2, 
                title: 'Loki',
                searchDate: '07/10/2021'
            }, {
                id: 3, 
                title: 'Alise in wonderland',
                searchDate: '07/10/2021'
            },
            {
                id: 4, 
                title: 'Pirates of the carribian, of the carribian',
                searchDate: '07/10/2021'
            }, {
                id: 5, 
                title: 'Loki',
                searchDate: '07/10/2021'
            }, {
                id: 6, 
                title: 'Alise in wonderland',
                searchDate: '07/10/2021'
            }, ]
        
        
            return (<View style={styles.historyPage}>
                <Text style={styles.header}>History</Text>
        
                <ListComponent {...listStyles as any} items={historyData}></ListComponent>
            </View>);
        }
}

const listStyles = StyleSheet.create({
    list: {
        width: '90%',
        height: '68%',

        // borderColor: 'red',
        // borderWidth: 1
    },
})

const styles = StyleSheet.create({
    historyPage: { 
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '10%',
        marginTop: '10%',
    }
})
