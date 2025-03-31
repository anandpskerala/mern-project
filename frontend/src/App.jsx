import { ToastContainer, Bounce } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { verifyUser } from './redux/actions/auth/verifyUser'
import { AppRoutes } from './routes/AppRoutes'
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(verifyUser());
  }, [dispatch]);

  return (
    <>
      <AppRoutes/>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
