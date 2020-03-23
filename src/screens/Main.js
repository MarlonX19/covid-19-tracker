import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions } from 'react-native';
import Divider from 'react-native-divider';
import { PieChart } from "react-native-chart-kit";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import api from '../Services/Services';


const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, 1)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
};

export default function Main() {
    const [total, setTotal] = useState(0);
    const [recovered, setRecovered] = useState(0);
    const [dead, setDead] = useState(0);


    async function fetchList() {
        api.get('/stats')
            .then(function (response) {
                let ttl = 0;
                let rcvrd = 0;
                let dead = 0;
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


    const data = [
        {
            name: "Ativos",
            population: total - recovered,
            color: "orange",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Recuperados",
            population: recovered,
            color: "green",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Fatais",
            population: dead,
            color: "grey",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },

    ];

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
                        <Text style={styles.casesNumber}>{total - recovered}</Text>
                    </View>
                    <View style={styles.cases}>
                        <Text style={styles.recoveredCases}>Casos recuperados</Text>
                        <Text style={styles.casesNumber}>{recovered}</Text>
                    </View>
                    <View style={styles.cases}>
                        <Text style={styles.deadlyCases}>Casos fatais</Text>
                        <Text style={styles.casesNumber}>{dead}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomView}>
                <PieChart
                    data={data}
                    width={windowWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="5"
                />
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
        backgroundColor: '#fff',
        borderWidth: 0.7,
        borderColor: 'lightgrey',
        borderRadius: 10,
        elevation: 9,
        margin: 10
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#fff',
        borderWidth: 0.7,
        borderColor: 'lightgrey',
        borderRadius: 10,
        elevation: 9,
        margin: 10
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
        alignItems: 'center',
        paddingHorizontal: 10
    },

    activeCases: {
        color: 'orange',
        fontSize: 20
    },

    recoveredCases: {
        color: 'green',
        fontSize: 20,
    },

    deadlyCases: {
        color: 'grey',
        fontSize: 20
    },

    casesNumber: {
        fontSize: 18
    }
});
