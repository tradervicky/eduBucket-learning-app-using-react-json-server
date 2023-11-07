
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import AdminDashbord from './components/Admin/AdminDashboard/AdminDashbord';
import CourseChapterUpdate from './components/Admin/AdminDashboard/CoursesCrud/CourseRead/CourseDetails/Update/CourseChapterUpdate';
import CourseNameUpdate from './components/Admin/AdminDashboard/CoursesCrud/CourseRead/CourseDetails/Update/CourseNameUpdate';
import CourseUnitUpdate from './components/Admin/AdminDashboard/CoursesCrud/CourseRead/CourseDetails/Update/CourseUnitUpdate';
import CourseVideosUpdate from './components/Admin/AdminDashboard/CoursesCrud/CourseRead/CourseDetails/Update/CourseVideosUpdate';
import CourseRead from './components/Admin/AdminDashboard/CoursesCrud/CourseRead/CourseRead';
import CoursesCreate from './components/Admin/AdminDashboard/CoursesCrud/CoursesCreate';
import AdminLogin from './components/Admin/LoginRegister/Adminlogin';
import TeacherCreate from './components/Admin/Teachers/TeacherCrud/TeacherCreate';
import TeacherUpdate from './components/Admin/Teachers/TeacherCrud/TeacherUdate';
import Enroll from './components/StudentUser/Enrollment Page/Enroll';
import HomePage from './components/StudentUser/Homepage/HomePage';
import StudentLogin from './components/StudentUser/StudentLoginRegister/StudentLogin';


function App() {
  return (
    
      
      <BrowserRouter>
      

      <Routes>
        <Route path='/' element={<HomePage/>}/>       
        <Route path='/enrollment' element={<Enroll/>}/>       
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/dashboard' element={<AdminDashbord/>}/>
        <Route path='/teacher-add' element={<TeacherCreate/>}/>
        <Route path='/teacher-update' element={<TeacherUpdate/>}/>
        <Route path='/course-create' element={<CoursesCreate/>}/>
        <Route path='/course-read' element={<CourseRead/>}/>
        <Route path='/course-name-update' element={<CourseNameUpdate/>}/>
        <Route path='/course-unit-update' element={<CourseUnitUpdate/>}/>
        <Route path='/course-chapter-update' element={<CourseChapterUpdate/>}/>
        <Route path='/course-video-update' element={<CourseVideosUpdate/>}/>
        <Route path='/student-login' element={<StudentLogin/>}/>
        <Route path='/enroll-course' element={<Enroll/>}/>

      </Routes>
      </BrowserRouter>
  );
}

export default App;
