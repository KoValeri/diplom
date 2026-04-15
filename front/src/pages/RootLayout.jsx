import { Outlet } from 'react-router-dom';
import ScrollToTop from '../router/ScrollToTop';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import AuthModal from "../components/Auth/AuthModal"
import { useSelector } from 'react-redux';
import { useGetFavoritesQuery } from '../api/favoritesApi'

function RootLayout() {
  const isOpen = useSelector(state => state.authModal.isOpen)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  useGetFavoritesQuery(undefined, {
      skip: !isAuthenticated
  })

  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <main>
        {isOpen && <AuthModal />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
