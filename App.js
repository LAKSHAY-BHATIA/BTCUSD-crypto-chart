import React, { Component } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';

export default class App extends Component {
  state={
    val: [],
    current: 'LOADING..'
  }
   
componentDidMount()
{
  const val = [];
  const date = new Date()
  const month = date.getMonth()
  const day = date.getDate();
  const year = date.getFullYear();
  let current = 0;
  fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-01-01&end=2020-07-24').then(res=>{
    return res.json()
  }).then(data=>{
    for(let i=1;i<month;i++)
    {
    //  console.log(data.bpi[`2020-0${i}-01`])
    if(i<10)
      val.push(data.bpi[`${year}-0${i}-01`])
      else
       val.push(data.bpi[`${year}-${i}-01`])
      }
      if(day>10 && month<10)
      {val.push(data.bpi[`${year}-0${month}-${day}`])
      current = data.bpi[`${year}-0${month}-${day}`]
      }
      else if(day>10 && month>10)
      { val.push(data.bpi[`${year}-${month}-${day}`])
      current = data.bpi[`${year}-${month}-${day}`]}
       else if(day<10 && month>10)
        {val.push(data.bpi[`${year}-${month}-0${day}`])
        current = data.bpi[`${year}-${month}-0${day}`]}
        else if(day<10 && month< 10)
        { val.push(data.bpi[`${year}-0${month}-0${day}`])
        current = data.bpi[`${year}-0${month}-0${day}`]}


     
this.setState({
  val: val,
  current: current
})
console.log(val)
    
  
  }).catch(err=>{
    console.log(err)
  })
 
}
    render() {
const  option = {
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Aug']
        },
        yAxis: {

            type: 'value'
        },
        series: [{
            data: this.state.val,
            type: 'line'
        }]
    };


        return (
            <View style={styles.chartContainer}>
            <Text style={styles.heading}>BITCOIN / US DOLLAR</Text>
            <Text style={styles.rate}>$ {this.state.current} (current rate)</Text>
            <Text style={styles.graphHeader}>BTCUSD crypto chart</Text>
                <ECharts option={option} ></ECharts>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chartContainer: {
    flex:1 ,
        width: "100%",
        height: '65%',
      margin: 1,
    },
    heading:{fontSize: 22,
    color: 'orange',
    marginLeft: 50,
    margin:5
    },

    rate:{fontSize: 20, color: 'green', marginLeft: 50},

    graphHeader:{fontSize: 18, marginLeft: 50, marginTop: 10, color: "gray"}

});