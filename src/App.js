import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Home />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
