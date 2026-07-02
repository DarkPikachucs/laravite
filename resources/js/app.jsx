import './bootstrap';
import '../css/app.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd'
import { CookiesProvider } from 'react-cookie'; // Import CookiesProvider
import thTH from 'antd/locale/th_TH'
import { Provider } from 'react-redux';
import store from './store';
import AppRoutes from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider>
          <ConfigProvider locale={thTH}>
            <AppRoutes />
          </ConfigProvider>
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
  );
}
