import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import {ScrollView} from 'react-native';

export default function TermsConditions(props) {
  return (
    <ScrollView style={styles.container}>
      <Text>Trms and </Text>

      <View style={{height: 10}} />
    </ScrollView>
  );
}
