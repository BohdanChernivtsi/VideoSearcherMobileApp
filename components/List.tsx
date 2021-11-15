import React, { Component, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import HistoryItem from './HistoryItem';
//componentWillReceiveProps
export class ListComponent extends Component {
    state = {
        items: [],
        style: {}
    }

    constructor(props: ListProps){
        super(props);
    }

    componentDidMount(){
        this.setState({
            items: (this.props as ListProps).items.map(item => {
                return <HistoryItem key={item.id} id={item.id} title={item.title} searchDate={item.searchDate} year={item.year}></HistoryItem>
            }),
            style: (this.props as ListProps).style
        })
    }

    getSnapshotBeforeUpdate(prevProps: ListProps, prevState: ListProps) {
        if (prevProps.items.length !== prevState.items.length) {
            return prevState.items.length
        }
        return null
      }

    componentDidUpdate(prevProps: ListProps, prevState: ListProps, snapshot: any) {
        if (snapshot !== null) {
            this.setState({
                items: (this.props as ListProps).items.map(item => {
                    return <HistoryItem key={item.id} id={item.id} title={item.title} searchDate={item.searchDate} year={item.year}></HistoryItem>
                }),
                style: (this.props as ListProps).style
            })
        }
    }

    render() { 
        return (<View style={this.state.style}>
            <ScrollView>
                { this.state.items }
            </ScrollView>
        </View>);
    }
    
}

interface ListProps {
    items: any[],
    style: any
}
