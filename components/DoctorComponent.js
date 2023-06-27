import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image} from 'react-native';
import { Card } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    doctors: state.doctors,
  }
};

class Doctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex:0
    };
  }

  _renderItem({item, index}) {
    const {navigate}= this.props.navigation;
    return (
      <TouchableOpacity key={index} onPress={() => navigate('Docdetail', { docId: item.id })}>
        <ScrollView>
            <Card
              wrapperStyle={styles.cardContainer}
              containerStyle={styles.card}>
              <Image source={{uri: baseUrl + item.image}}
                     style={styles.image}/>
              <View style={styles.cardInfo}>
                <Text style={styles.department}>{item.department}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.certificate}>{item.certificate}</Text>
              </View>
            </Card>
        </ScrollView>
      </TouchableOpacity>
    )
  }

  render() {
    if(this.props.doctors.isLoading) {
      return(<Loading />);
    }
    else if (this.props.doctors.errMess) {
      return(<Text>{this.props.errMess}</Text>);
    }
    else {
      return (
        <View style={styles.container}>
          <Carousel
            loop={true}
            autoplay={true}
            layout={'stack'}
            activeSlideOffset={10}
            ref={ref => this._carousel = ref}
            data={this.props.doctors.doctors}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width - 60}
            renderItem={this._renderItem.bind(this)}
            onSnapToItem={index => this.setState({activeIndex:index})}/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
    padding: 0
  },
  image: {
    width: "100%",
    height: Dimensions.get('window').height *0.45,
    borderRadius: 20,
  },
  cardContainer: {
    height: Dimensions.get('window').height * 0.62,
    justifyContent: 'flex-end',
    margin: 15
  },
  cardInfo: {
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 20,
    paddingTop:5,
    paddingBottom:10,
    paddingHorizontal:10,
    opacity:0.8,
  },
  certificate: {
    color:'#20B2AA',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical:3
  },
  name: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginVertical:3
  },
  department: {
    fontSize: 18,
    color: 'black',
    marginVertical:3
  },
});

export default connect(mapStateToProps)(Doctor);
