import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { getDatabase, ref, child, get } from 'firebase/database';
import { connect } from 'react-redux';
import { loginUser } from '../redux/ActionCreators';
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
};
const mapDispatchToProps = (dispatch) => ({
  loginUser: (userinfo) => dispatch(loginUser(userinfo))
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false
    }
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', margin: 20 }}>
        <Input
          placeholder='Username'
          leftIcon={{ name: 'user-o', type: 'font-awesome' }}
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })} />
        <Input
          placeholder='Password'
          leftIcon={{ name: 'key', type: 'font-awesome' }}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })} />
        <CheckBox containerStyle={{ backgroundColor: null }}
          title='Remember Me' center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })} />
        <View style={{ marginTop: 20 }}>
          <Button title='Đăng Nhập' buttonStyle={{backgroundColor: '#009999', borderRadius:25}} onPress={() => this.handleLogin()} />
        </View>
      </View>
    );
  }
  componentDidMount() {
    if (this.props.users.userinfo && this.props.users.userinfo.remember === true) {
      this.setState({
        username: this.props.users.userinfo.username,
        password: this.props.users.userinfo.password,
        remember: this.props.users.userinfo.remember
      });
    }
  }
  handleLogin() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'accounts/' + this.state.username)).then((snapshot) => {
      if (snapshot.exists()) {
        const account = snapshot.val();
        if (account.password === this.state.password) {
          alert('Đăng nhập thành công!');
          const userinfo = {
            username: this.state.username,
            password: this.state.password,
            remember: this.state.remember
          };
          this.props.loginUser(userinfo);
          this.props.navigation.navigate('HomeScreen');
        } else {
          alert('Mật khẩu không đúng!');
        }
      } else {
        alert('Tên đăng nhập không đúng!');
      }
    }).catch((error) => alert('Could not get data from firebase', error));
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);