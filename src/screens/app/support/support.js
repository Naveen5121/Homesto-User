import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/colors';
import {Divider} from 'react-native-paper';

export default function Support() {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>HOMESTO</Text>
      </View>
      <Divider />

      <View style={styles.contentContainer}>
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Ionicons color={COLORS.PRIMARY} size={20} name={'call'} />
            <TouchableOpacity>
              <Text style={styles.content}>{'   '}+91 8585858585</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Ionicons color={COLORS.PRIMARY} size={20} name={'mail'} />
            <TouchableOpacity>
              <Text style={styles.content}>{'    '}homesto@rooms.com</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
