import { BrowserRouter as Router, Routes,Route,  useLocation} from 'react-router-dom';

import Home from '../routes/Home/Home';
import Discover from '../routes/Discover/Discover';
import Trips from '../routes/Trips/Trips';
import Review from '../routes/Review/Review';
import Signup from '../routes/Signup/Signup';
import ForgotPassword from '../routes/Signup/ForgotPassword';
import AuthContextProvider from './context/AuthContextProvider';
import UserProfile from '../routes/Profile/UserProfile';
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import { CssBaseline } from '@mui/material';
import TripDetails from '../routes/Trips/TripDetails/TripDetails';

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

import './App.css';



const theme = createTheme({
     typography: {
         fontFamily: 'Poppins, sans-serif',
  },
        spacing: 1,
  
});


function App() {
    const location= useLocation()
    const excludedRoutes = ['/Signup', '/Forgotpassword'];

    return (
        <>
        <div className='App'>
            
            <ThemeProvider theme={theme} >
            <CssBaseline/>
            <div className=''>
            <AuthContextProvider>
                {!excludedRoutes.includes(location.pathname) && <Navbar />}
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/Discover' element={<Discover />} />
                        <Route path='/Trips' element={<Trips />} />
                        <Route path='/Review' element={<Review />} />
                        <Route path='/Signup' element={<Signup />} />
                        <Route path='/Forgotpassword' element={< ForgotPassword/>} />
                        <Route path='/Profile' element={<UserProfile />} />
                        <Route path='/TripDetails' element={<TripDetails />} />

                    </Routes>
                    <Footer />
                </AuthContextProvider>
            </div>
        </ThemeProvider>
        </div>
        </>
    );
}

export default App;