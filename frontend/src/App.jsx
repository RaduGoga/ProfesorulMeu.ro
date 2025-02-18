import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import TeacherPage from './pages/TeacherPage';
import AddTeacherPage from './pages/AddTeacherPage';
import Navbar from './components/Navbar';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/teachers/:id" element={<TeacherPage/>} />
          <Route path="/add-teacher" element={<AddTeacherPage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
