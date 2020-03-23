import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function HeaderButton(props) {
  return (
    <Icon style={{ marginHorizontal: 15}} name="search" size={20} color="black" />
  );
}

