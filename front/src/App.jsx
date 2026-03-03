import AppRouter from "./router/AppRouter.jsx";
import { ReduxProvider } from './providers/ReduxProvider';

function App() {
  return (
    <ReduxProvider>
      <AppRouter />
    </ReduxProvider>
  );
}

export default App;