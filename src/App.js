
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import AdminDashbord from './components/Admin/AdminDashboard/AdminDashbord';
import AdminLogin from './components/Admin/LoginRegister/Adminlogin';
import TeacherCreate from './components/Admin/Teachers/TeacherCrud/TeacherCreate';

function App() {
  return (
    
      
      <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/dashboard' element={<AdminDashbord/>}/>
        <Route path='/teacher-add' element={<TeacherCreate/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
