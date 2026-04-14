import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../../../auth-context';
import ModalAlert from '../../../../components/modal-alert';
import LinearGradient from 'react-native-linear-gradient';
import API from '../../../../action/api';

export default function ViewProfile(props) {
  const { userProfile } = React.useContext(AuthContext);
  const { updateUserProfile } = React.useContext(AuthContext).authContext;

  const list = [

    {
      name: 'My Trips',
      image: 'briefcase',
      subHeading: 'All your booking in one place',
      onPress: () => props.navigation.navigate('TopTabNavigator'),
    },


  ];

  const [refreshing, setRefreshing] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const { signOut } = React.useContext(AuthContext).authContext;

  const signOutUser = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('accessToken');

      signOut({});
      setModalVisible(!isModalVisible);
    } catch (e) {
      console.log(e);
    }
  };

  async function fetchProfile() {
    try {
      const data = await API.getUserProfile();
      if (data && data.success === 'true') {
        updateUserProfile({userProfile: data.extraData.profile});
      }
    } catch (e) {
      console.log('fetchProfile error', e);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await fetchProfile();
    setRefreshing(false);
  }

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        style={{}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.PRIMARY]}
            tintColor={COLORS.PRIMARY}
          />
        }>
        <View style={{ height: 50, backgroundColor: COLORS.PRIMARY }} />

        <View style={styles.topContainer}>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <LinearGradient
              colors={[COLORS.PRIMARY, COLORS.SECONDARY]}
              style={styles.avatar}>
              <Text style={styles.avatarName}>{userProfile?.name[0]}</Text>
            </LinearGradient>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{userProfile?.name}</Text>
              {/* <Text style={styles.info}>+91 9876543210</Text> */}
              <Text style={styles.info}>{userProfile?.phone}</Text>

              <Text style={styles.info}>{userProfile?.email}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('EditProfile', userProfile)
              }>
              <Ionicons name="pencil" color={COLORS.BLACK} size={18} />
            </TouchableOpacity>
          </View>
          {/*   <View>
            <ProgressBar
              progress={0.35}
              color={COLORS.SECONDARY}
              style={{height: 5, borderRadius: 10}}
            />
            <Text style={styles.completeStatus}>
              Your profile is 35% complete
            </Text>
          </View> */}
        </View>
        <Text style={styles.heading}>My Account</Text>
        {list.map((item, i) => (
          <TouchableOpacity
            style={styles.listContainer}
            key={i}
            onPress={item.onPress}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={item.image + '-outline'}
                color={COLORS.PRIMARY}
                size={20}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.listHeading}>{item.name}</Text>

              {item.subHeading && (
                <Text style={styles.listSubHeading}>{item.subHeading}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ marginVertical: 10 }} />
        {/*  <TouchableOpacity
          style={styles.listContainer}
          // onPress={() => props.navigation.navigate('PrivacyPolicy')}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name={'document-lock-outline'}
              color={COLORS.PRIMARY}
              size={20}
            />
          </View>
          <Text style={styles.listHeading}>{'User Agreement'}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={styles.listContainer}
          // onPress={() => props.navigation.navigate('TermsConditions')}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name={'document-text-outline'}
              color={COLORS.PRIMARY}
              size={20}
            />
          </View>
          <Text style={styles.listHeading}>{'Terms of Services'}</Text>
        </TouchableOpacity> */}
        {/*   <TouchableOpacity
          style={styles.listContainer}
          onPress={() => setModalVisible(!isModalVisible)}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={'log-out-outline'}
              color={COLORS.PRIMARY}
              size={20}
            />
          </View>
          <Text style={styles.listHeading}>{'Logout'}</Text>
        </TouchableOpacity> */}
      </ScrollView>

      <ModalAlert
        isVisible={isModalVisible}
        onSkip={() => setModalVisible(false)}
        onClose={() => setModalVisible(false)}
        redBtnTxt="Yes"
        btnTxt="No"
        txt="Are you sure you want to logout from this device?"
        heading="Log Out"
        onConfirm={() => signOutUser()}
      />
    </View>
  );
}
