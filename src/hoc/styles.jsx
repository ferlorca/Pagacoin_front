import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#276678' },
        secondary: { main: '#d3e0ea' },
    }    
});

function Style(props) {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <React.Fragment>
                    {props.children}
            </React.Fragment>
        </MuiThemeProvider>
    )
}

export default Style
