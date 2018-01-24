import React, { Component } from 'react'
import styles from './App.css'
import AppHeader from '../page-components/AppHeader.js'
import BlockContainer from '../page-components/BlockContainer.js'

class App extends Component {
  render () {
    return (
      <div className={styles.App}>
        <AppHeader />
        <main>
          <BlockContainer />
        </main>
      </div>
    )
  }
}

export default App
