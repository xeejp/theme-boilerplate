import App from './App.js'
import saga from './saga'
import reducer from './reducer'

import startApp from 'shared/index.js'

startApp(App, reducer, saga)
