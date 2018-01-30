import React, { Component } from 'react'
import styles from './AppHeader.css'

class AppHeader extends Component {
  render () {
    return (
      <header className={styles.header}>
        <h1 className={styles.appTitle}>App Header</h1>
      </header>
    )
  }
}

export default AppHeader
