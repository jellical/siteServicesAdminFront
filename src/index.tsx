

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { SettingsProvider } from './contexts/SettingsContext'
import store from './store'

import './i18n'

import App from './App'

ReactDOM.render(
    <Provider store={store}>
        <SettingsProvider>
            <App />
        </SettingsProvider>
    </Provider>,
    document.getElementById('root')
)