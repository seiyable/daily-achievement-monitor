import React, {Component} from 'react'
import styles from './BlockContainer.css'
import MonitorBlock from './MonitorBlock.js'
import TwitterBlock from './TwitterBlock.js'

class BlockContainer extends Component {
  render () {
    return (
      <ul className={styles.container}>
        <TwitterBlock />
        <MonitorBlock />
        <MonitorBlock />
        <MonitorBlock />
        <MonitorBlock />
        <MonitorBlock />
      </ul>
    )
  }
}

export default BlockContainer
