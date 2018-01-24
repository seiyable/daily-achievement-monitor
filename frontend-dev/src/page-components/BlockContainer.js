import React, {Component} from 'react'
import styles from './BlockContainer.css'
import MonitorBlock from './MonitorBlock.js'

class BlockContainer extends Component {
  render () {
    return (
      <ul className={styles.container}>
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
