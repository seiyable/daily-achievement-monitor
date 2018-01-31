import React, {Component} from 'react'
import styles from './TwitterBlock.css'
import CONFIG from '../../api-config'
import axios from 'axios'
import {Line} from 'react-chartjs-2'

function getChartData (labels, dailyTweetCounts) {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Twitter',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dailyTweetCounts
      }
    ]
  }
}

function getLabels (DAY_COUNTS) {
  let labels = []

  let calendar = new Date() // date object to set dates to the labels array
  calendar.setDate(calendar.getDate() - DAY_COUNTS) // roll back the calendar
  for (let i = 0; i < DAY_COUNTS; i++) {
    labels.push(calendar.getDate())
    calendar.setDate(calendar.getDate() + 1) // next day
  }

  return labels
}

function countDailyTweets (labels, tweets) {
  // initialize the tweetCountsArray with making sure it has the same length with the labels array
  let tweetCountsArray = Array(labels.length).fill(0)

  const DAY_ENDS_AT = 4 // what time in the midnight a day ends
  for (let i = 0; i < tweets.length; i++) {
    let d = new Date(tweets[i].created_at)

    // if it's midnight before 4 am, regard it as the prev day
    if (d.getHours() < DAY_ENDS_AT) {
      d.setDate(d.getDate() - 1)
    }

    // get the index of an item which has the same value in the labels array
    let index = labels.indexOf(d.getDate())

    // count up
    if (index > 0) {
      tweetCountsArray[index]++
    }
  }

  return tweetCountsArray
}

class TwitterBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chartdata: {}
    }
  }
  componentWillMount () {
    axios.get(CONFIG.HOST + CONFIG.TWITTER)
    .then((res) => {
      console.log('received new tweets: ', res.data.tweets)
      let tweets = res.data.tweets
      const DAY_COUNTS = 30
      let labels = getLabels(DAY_COUNTS)
      let dailyTweetCounts = countDailyTweets(labels, tweets)
      this.setState({chartdata: getChartData(labels, dailyTweetCounts)})
    })
  }
  render () {
    return (
      <div className={styles.wrapper}>
        {this.state.chartdata &&
          <Line
            data={this.state.chartdata}
            options={{
              maintainAspectRatio: false
            }}
          />
        }
      </div>
    )
  }
}

export default TwitterBlock
