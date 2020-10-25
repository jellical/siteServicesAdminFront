import React, { useContext } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { create } from 'jss'
import { SnackbarProvider } from 'notistack'
import {
    jssPreset,
    StylesProvider,
    ThemeProvider
} from '@material-ui/core'

import GlobalStyles from './components/GlobalStyles'
import CookiesNotification from './components/CookiesNotification'
import SettingsContext from './contexts/SettingsContext'
import { AuthProvider } from './contexts/AuthContext'
import { createTheme } from './theme'
import routes, { renderRoutes } from './routes'


const jss = create({ plugins: [...jssPreset().plugins] });
const history = createBrowserHistory();

const App = () => {

    const { settings } = useContext(SettingsContext);

    const theme = createTheme({
        responsiveFontSizes: settings.responsiveFontSizes,
        theme: settings.theme
    });

    return(
        <ThemeProvider theme={theme}>
            <StylesProvider jss={jss}>
                    <SnackbarProvider
                        dense
                        maxSnack={3}
                    >
                        <Router history={history}>
                            <AuthProvider>
                                <GlobalStyles />
                                <CookiesNotification />
                                {renderRoutes(routes)}
                            </AuthProvider>
                        </Router>
                    </SnackbarProvider>
            </StylesProvider>
        </ThemeProvider>
    )
}


export default App