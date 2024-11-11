import { useState, createContext, useContext} from 'react';
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import axios from 'axios';
import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, BigSidebar, SmallSidebar } from '../components';
import customFetch from '../utils/customFetch';


export const loader = async () => {
  try {
    const { data } = await customFetch('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};

const DashboardContext = createContext();
const Dashboard = ({ isDarkThemeEnabled }) => {
const navigate = useNavigate();


const user = useLoaderData();
// const user= {name:'john'};
// console.log("user data", user);

  // temp
  // const user = { name: 'john' };

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };


  // test function


  // useEffect(()=>{
  //   let getData = async() => {
  //     const data = await customFetch.get('/test');
  //     console.log(data);
  //   };
  //   getData();
  // })

  // test function

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  
  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{user}}/>
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;