import { Outlet } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import AuthModal from "../components/Auth/AuthModal"
import { useSelector } from 'react-redux';

function RootLayout() {
  const isOpen = useSelector(state => state.authModal.isOpen)

  return (
    <>
      <Header />
      <main>
        {isOpen && <AuthModal />}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
