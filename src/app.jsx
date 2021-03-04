import React from 'react'
import { Provider } from 'react-redux'
import BrowserRoutes from "./browserRouter";

function App({store}) {
    return (
        <Provider store={store}>           
          <BrowserRoutes/>                 
        </Provider>
    )
}

export default App
