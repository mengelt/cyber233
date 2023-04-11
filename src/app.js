import { useRoutes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RTL } from './components/rtl';
import { SplashScreen } from './components/splash-screen';
import { SettingsButton } from './components/settings/settings-button';
import { SettingsDrawer } from './components/settings/settings-drawer';
import { Toaster } from './components/toaster';
import { SettingsConsumer, SettingsProvider } from './contexts/settings-context';
import { AuthConsumer, AuthProvider } from './contexts/auth/jwt-context';

import { useNprogress } from './hooks/use-nprogress';

import { routes } from './routes';
import { store } from './store';
import { createTheme } from './theme';

// Remove if mapbox is not used
import 'mapbox-gl/dist/mapbox-gl.css';
// Remove if locales are not used
import './locales/i18n';

export const App = () => {
  
  useNprogress();

  const element = useRoutes(routes);

  return (
    <ReduxProvider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <AuthConsumer>
            {(auth) => (
              <SettingsProvider>
                <SettingsConsumer>
                  {(settings) => {
                    // Prevent theme flicker when restoring custom settings from browser storage
                    if (!settings.isInitialized) {
                      // return null;
                    }

                    const theme = createTheme({
                      colorPreset: settings.colorPreset,
                      contrast: settings.contrast,
                      direction: settings.direction,
                      paletteMode: settings.paletteMode,
                      responsiveFontSizes: settings.responsiveFontSizes
                    });

                    // Prevent guards from redirecting
                    const showSlashScreen = !auth.isInitialized;

                    return (
                      <ThemeProvider theme={theme}>
                        <Helmet>
                          <meta
                            name="color-scheme"
                            content={settings.paletteMode}
                          />
                          <meta
                            name="theme-color"
                            content={theme.palette.neutral[900]}
                          />
                        </Helmet>
                        <RTL direction={settings.direction}>
                          <CssBaseline />
                          {showSlashScreen
                            ? <SplashScreen />
                            : (
                              <>
                                {element}
                                <SettingsButton onClick={settings.handleDrawerOpen} />
                                <SettingsDrawer
                                  canReset={settings.isCustom}
                                  onClose={settings.handleDrawerClose}
                                  onReset={settings.handleReset}
                                  onUpdate={settings.handleUpdate}
                                  open={settings.openDrawer}
                                  values={{
                                    colorPreset: settings.colorPreset,
                                    contrast: settings.contrast,
                                    direction: settings.direction,
                                    paletteMode: settings.paletteMode,
                                    responsiveFontSizes: settings.responsiveFontSizes,
                                    stretch: settings.stretch,
                                    layout: settings.layout,
                                    navColor: settings.navColor
                                  }}
                                />
                              </>
                            )}
                          <Toaster />
                        </RTL>
                      </ThemeProvider>
                    );
                  }}
                </SettingsConsumer>
              </SettingsProvider>
            )}
          </AuthConsumer>
        </AuthProvider>
      </LocalizationProvider>
    </ReduxProvider>
  );
};
