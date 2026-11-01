import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./global/store";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import LoadingScreen from "./components/static/LoadingScreen";
import RouterScreen from "./router/RouterScreen";
import PrivateRouter from "./router/PrivateRouter";
import { Helmet } from "react-helmet";
import OfflineIndicator from "./components/static/OfflineIndicator";
import useOfflineClock from "./hooks/useOfflineClock";
// import { SWRConfig } from "swr";

let persistor = persistStore(store);

const App = () => {
  useOfflineClock();
  const helmetContext: any = {};
  return (
    // <SWRConfig value={swrConfig}>
    <div className="bg-white">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Just Next - Best School Management Platform</title>
        <meta name="description" content="Just Next provides standard, all-in-one school management solutions, portal access for admins, teachers, and students." />
        <link rel="canonical" href="https://justnext.ng/" />
      </Helmet>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary fallback={<LoadingScreen />}>
            <RouterScreen />
            <OfflineIndicator />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </div>
    // </SWRConfig>
  );
};

export default App;
