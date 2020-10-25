import React, {
    createContext,
    useEffect,
    useState,
    FunctionComponent
} from 'react';
import _ from 'lodash';
import { THEMES } from '../constants';

interface Settings {
    responsiveFontSizes: boolean,
    theme: string
}

const defaultSettings: Settings = {
    responsiveFontSizes: true,
    theme: THEMES.DEFAULT
};

export const restoreSettings = () => {
    let settings = null;

    try {
        const storedData = window.localStorage.getItem('settings');

        if (storedData) {
            settings = JSON.parse(storedData);
        }
    } catch (err) {
        console.error(err);
    }

    return settings;
};

export const storeSettings = (settings: Settings) => {
    window.localStorage.setItem('settings', JSON.stringify(settings));
};

const SettingsContext = createContext({
    settings: defaultSettings,
    saveSettings: (O:{}) => { }
});

interface SettingsProviderProps {
    settings?: Settings
}

export const SettingsProvider: FunctionComponent<SettingsProviderProps> = ({ settings, children }) => {
    const [currentSettings, setCurrentSettings] = useState(settings || defaultSettings);

    const handleSaveSettings = (update = {}) => {
        const mergedSettings = _.merge({}, currentSettings, update)

        setCurrentSettings(mergedSettings)
        storeSettings(mergedSettings)
    };

    useEffect(() => {
        const restoredSettings = restoreSettings();

        if (restoredSettings) {
            setCurrentSettings(restoredSettings);
        }
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                settings: currentSettings,
                saveSettings: handleSaveSettings
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
