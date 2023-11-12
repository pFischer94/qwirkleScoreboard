import './App.css'
import { Provider } from 'react-redux';
import { store } from './redux/reduxStore';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/routeConfig';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
