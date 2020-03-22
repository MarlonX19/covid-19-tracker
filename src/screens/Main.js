import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import Divider from 'react-native-divider';

import api from '../Services/Services';

export default function Main() {
    const [total, setTotal] = useState(0);
    const [active, setActive] = useState(0);
    const [recovered, setRecovered] = useState(0);
    const [dead, setDead] = useState(0);


    async function fetchList() {
        api.get('/stats')
            .then(function (response) {
                let ttl = 0;
                let rcvrd = 0;
                let actv = 0;
                let dead = 0;
                console.log(response.data)
                response.data.data.covid19Stats.map(index => { ttl += index.confirmed, dead += index.deaths, rcvrd += index.recovered })
                setTotal(ttl)
                setRecovered(rcvrd)
                setDead(dead)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#fff' />
            <View style={styles.topView}>
                <View style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Text style={styles.title}>Total de casos confirmados</Text>
                    <Text style={styles.ttl}>{total}</Text>
                </View>
                <Divider color='#ccc' orientation='center'>Tipos de casos</Divider>
                <View style={styles.casesView}>
                    <View style={styles.cases}>
                        <Text style={styles.activeCases}>Casos ativos</Text>
                        <Text>{total - recovered}</Text>
                    </View>
                    <View style={styles.cases}>
                        <Text style={styles.recoveredCases}>Casos recuperados</Text>
                        <Text>{recovered}</Text>
                    </View>
                    <View style={styles.cases}>
                        <Text style={styles.deadlyCases}>Casos fatais</Text>
                        <Text>{dead}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomView}>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    topView: {
        flex: 1,
    },

    title: {
        color: '#525151',
        fontSize: 26
    },

    ttl: {
        fontSize: 32,
        color: '#b30000',
        fontFamily: 'sans-serif-thin',
        fontWeight: 'bold'
    },

    bottomView: {
        flex: 1
    },

    casesView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },

    cases: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },

    activeCases: {
        color: 'orange'
    },

    recoveredCases: {
        color: 'green'
    },

    deadlyCases: {
        color: 'grey'
    }
});
