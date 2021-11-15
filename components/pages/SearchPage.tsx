import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { ListComponent } from '../List';

export default class SearchPage extends Component {

    state = {
        searchValue: '',
        list: null
    }

    changeSearch = (value: string) => {
        const items = [{
            id: 1, 
            title: 'Pirates of the carribian, my the carribian',
            year: '2021'
        }, {
            id: 2, 
            title: 'Loki',
            year: '2021'
        }, {
            id: 3, 
            title: 'Alise in wonderland',
            year: '2021'
        },
        {
            id: 4, 
            title: 'Pirates of the carribian, of the carribian',
            year: '2021'
        }, {
            id: 5, 
            title: 'Loki',
            year: '2021'
        }, {
            id: 6, 
            title: 'Alise in wonderland',
            year: '2021'
        }]

        this.setState({
            searchValue: value,
            list: <ListComponent {...listStyles as any} items={items}></ListComponent>
        })
    }

    render() {
        return (<View style={styles.searchPage}>
            <Text style={styles.header}>Search</Text>
    
            <SearchBar { ...{} as any }
                placeholder="Search for content"
                onChangeText={this.changeSearch}
                value={this.state.searchValue}
    
                lightTheme={true}
                round={true}
                containerStyle={styles.search}
            />

            { this.state.list }
        </View>)
    }
}

const listStyles = StyleSheet.create({
    list: {

    },
})

const styles = StyleSheet.create({
    
    search: {
        width: '85%',
        backgroundColor:"#9DD6EB",
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    },
    searchPage: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#9DD6EB',

        // borderColor: 'red',
        // borderWidth: 1
    },
    header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '10%',
        marginTop: '10%',
    }
})