import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
import { getDatabase, ref, child, onValue } from 'firebase/database';



class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      street: '',
      district: '',
      city: '',
      phone: '',
      fax: '',
      email: ''
    }
  }
  render() {
    return (
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
      <Card containerStyle={styles.card}>
        <Card.Title style = {styles.title}>Thông tin liên hệ của chúng tôi</Card.Title>
        <Card.Divider />
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Icon name='location-on'style={styles.icon} />
              <Text style={styles.infoText}>{this.state.number}, {this.state.street}</Text>
            </View>
            <View style={styles.row}>
              <Icon name='location-city'style={styles.icon} />
              <Text style={styles.infoText}>{this.state.district}</Text>
            </View>
            <View style={styles.row}>
              <Icon name='location-city' style={styles.icon} />
              <Text style={styles.infoText}>{this.state.city}</Text>
            </View>
            <View style={styles.row}>
              <Icon name='phone' style={styles.icon} />
              <Text style={styles.infoText}>Tel: {this.state.phone}</Text>
            </View>
            <View style={styles.row}>
              <Icon name='fax' type="font-awesome" style={styles.icon} />
              <Text style={styles.infoText}>Fax: {this.state.fax}</Text>
            </View>
            <View style={styles.row}>
              <Icon name='email' style={styles.icon} />
              <Text style={styles.infoText}>Email: {this.state.email}</Text>
            </View>
          </View>
        
        <Button titleStyle={styles.buttonText} title=' Liên hệ bằng Email' buttonStyle={styles.button}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.composeMail} />
      </Card>
    </Animatable.View>
    );
  }
  componentDidMount() {
    const dbRef = ref(getDatabase());
    onValue(child(dbRef, 'contact/'), (snapshot) => {
      const value = snapshot.val();
      this.setState({
        number: value.address.number,
        street: value.address.street,
        district: value.address.district,
        city: value.address.city,
        phone: value.phone,
        fax: value.fax,
        email: value.email
      });
    });
  }
  composeMail() {
    MailComposer.composeAsync({
      recipients: ['anh.pht06645@sinhvien.hoasen.edu.vn'],
      subject: 'From Confusion',
      body: 'Hello my friends ...'
    });
  }
}

const styles = StyleSheet.create({
  card: { borderRadius: 25, marginHorizontal: 20, marginVertical: 30, padding: 20},
  titleContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20},
  title: { fontSize: 18, fontWeight: 'bold'},
  infoContainer: { marginVertical: 10},
  row: { flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 6, alignItems: 'center'},
  icon: { marginRight: 20, width: 25, size: 30, textAlign: 'center'},
  infoText: { margin: 5, fontSize: 15},
  button: { backgroundColor: '#009999', borderRadius: 25},
  buttonText: { fontSize: 16, fontWeight: 'bold', marginLeft: 5}
});

export default Contact;