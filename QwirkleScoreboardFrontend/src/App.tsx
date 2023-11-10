import './App.css'
import { Provider } from 'react-redux';
import { store } from './redux/reduxStore';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/routeConfig';

function App() {
  return (
    <Provider store={store}>
      <h1>Qwirkle Scoreboard</h1>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
