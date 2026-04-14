import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {IMAGES} from '../../../constants/images';
import styles from './style';
import {COLORS} from '../../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import IconLabelInput from '../../../components/icon-label-input';
import CustomBtn from '../../../components/custom-btn';
import {AuthContext} from '../../../../auth-context';
import ToastAlertMsg from '../../../components/toast-alert-msg';
import ActivityLoader from '../../../components/activity-loader';
import API from '../../../action/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn(props) {
  const {signIn} = React.useContext(AuthContext).authContext;

  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(null);

  const onSendOTP = async () => {
    try {
      if (phone && phone.toString().trim().length > 0) {
        setIsLoading(true);
        const data = await API.setLoginData(phone);
        console.log('Send OTP response:', data);

        if (data && (data.success === 'true' || data.success === true)) {
          setIsLoading(false);
          setOtpSent(true);
          ToastAlertMsg(data?.extraData || 'OTP sent successfully');
        } else {
          setIsLoading(false);
          ToastAlertMsg(data?.msg || 'Failed to send OTP.');
        }
      } else {
        ToastAlertMsg('Please enter a valid mobile number');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      ToastAlertMsg('Request failed. Please try again.');
    }
  };

  const onVerifyOTP = async () => {
    try {
      if (otp && otp.toString().trim().length > 0) {
        setIsLoading(true);
        const data = await API.getOtpData(otp, phone);
        console.log('Verify OTP response:', data);

        if (data && (data.success === 'true' || data.success === true)) {
          if (data.user_id) await AsyncStorage.setItem('userId', data.user_id.toString());
          if (data.token) await AsyncStorage.setItem('accessToken', data.token);
          if (data?.user_status == '1') {
            signIn({token: data.token, id: data.user_id});
          } else {
            props.navigation.navigate('SignUp', {
              phone: phone,
              token: data.token,
              user_id: data.user_id,
            });
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
          ToastAlertMsg(data?.msg || 'Invalid OTP. Please try again.');
        }
      } else {
        ToastAlertMsg('Please enter the OTP');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      ToastAlertMsg('Login failed. Please try again.');
    }
  };

  // ─── Page 1: Enter Phone Number ───────────────────────────────────────────
  if (!otpSent) {
    return (
      <>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        {isLoading && <ActivityLoader isLoading={isLoading} />}
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              <View style={{flex: 1}}>
                <Image source={IMAGES.LOGO} style={styles.logo} />
                <Text style={styles.title}>Welcome to Homesto</Text>
                <Text style={styles.subTitle}>
                  Enter your mobile number to continue
                </Text>
                <IconLabelInput
                  icon="phone"
                  placeholder="Mobile Number"
                  defaultValue={phone}
                  keyboardType="phone-pad"
                  maxLength={10}
                  onChangeText={text => setPhone(text)}
                />
              </View>
              <View>
                <CustomBtn title="GET OTP" onPress={() => onSendOTP()} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }

  // ─── Page 2: Enter OTP ────────────────────────────────────────────────────
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{marginTop: Platform.OS === 'ios' ? 20 : 10, marginBottom: 10}}
                onPress={() => setOtpSent(false)}>
                <Feather name="arrow-left" size={22} color={COLORS.BLACK} />
              </TouchableOpacity>
              <Image source={IMAGES.LOGO} style={styles.logo} />
              <Text style={styles.title}>Verify your number</Text>
              <Text style={styles.subTitle}>
                OTP sent to +91 {phone}
              </Text>
              <IconLabelInput
                icon="lock"
                placeholder="Enter OTP"
                defaultValue={otp}
                keyboardType="number-pad"
                maxLength={6}
                onChangeText={text => setOtp(text)}
              />
              <TouchableOpacity
                style={{marginTop: 12}}
                onPress={() => onSendOTP()}>
                <Text style={styles.forgotPassword}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
            <View>
              <CustomBtn title="VERIFY & LOGIN" onPress={() => onVerifyOTP()} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
