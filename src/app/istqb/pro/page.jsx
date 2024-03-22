'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JSON1 from './jsons/istqb1.json';
import JSON2 from './jsons/istqb2.json';
import JSON3 from './jsons/istqb3.json';
import JSON4 from './jsons/istqb4.json';
import JSON5 from './jsons/istqb5.json';
import JSON6 from './jsons/istqb6.json';
import JSON7 from './jsons/istqb7.json';
import JSON8 from './jsons/istqb8.json';
import JSON9 from './jsons/istqb9.json';
import JSON10 from './jsons/istqb10.json';
import Preguntas from './Preguntas';

export default function Exam() {
  const [datos, setDatos] = useState([]);
  const [numberExam, setNumberExam] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const lista = [
    { id: 1, json: JSON1 },
    { id: 2, json: JSON2 },
    { id: 3, json: JSON3 },
    { id: 4, json: JSON4 },
    { id: 5, json: JSON5 },
    { id: 6, json: JSON6 },
    { id: 7, json: JSON7 },
    { id: 8, json: JSON8 },
    { id: 9, json: JSON9 },
    { id: 10, json: JSON10 }
  ];

  const fetchData = (number) => {
    const jsons = [null, JSON1, JSON2, JSON3, JSON4, JSON5, JSON6, JSON7, JSON8, JSON9, JSON10];
    setDatos(jsons[number]);
  };

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleReset = (number) => {
    setDatos([]);
    const jsons = [null, JSON1, JSON2, JSON3, JSON4, JSON5, JSON6, JSON7, JSON8, JSON9, JSON10];
    setDatos(jsons[number]);
    setNumberExam(number);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:9300/api/user/login', { email, password }, { withCredentials: true });
      if (response.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        setLoginError('');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError('Credenciales inválidas');
      } else {
        setLoginError('Error en el inicio de sesión');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:9300/api/user/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', 'false');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className='w-screen h-screen mx-auto lg:w-[850px]' >
      {isLoggedIn ? (
        <>
          <div className='flex justify-end p-2'>
            <button onClick={handleLogout} className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>Cerrar sesión</button>
          </div>
          <h1 className='text-center p-2 font-extrabold text-2xl text-[#23242e]'>Seleccione la lista de preguntas</h1>
          <div className='font-extrabold text-center text-4xl text-[#353745]'> EXAMEN {numberExam}</div>
          <div className='grid grid-cols-3 md:grid-cols-7 gap-2 mt-5'>
            {lista.map((examen, index) => (
              <div
                key={index}
                className={`${numberExam === (index + 1) ? 'bg-[#6a708d] text-white' : 'bg-gray-200 text-black'} cursor-pointer  p-2 m-1 font-bold border rounded-md`}
                onClick={() => { fetchData(index + 1); handleReset(index + 1) }}
              >
                Examen: {examen.id}
              </div>
            ))}
          </div>
          {datos && <Preguntas datos={datos} />}
        </>
      ) : (
        <div className='flex flex-col items-center py-10 rounded-md' style={{ backgroundImage: 'linear-gradient(to right, #667eea, #764ba2)' }} >
          <h1 className='text-2xl font-bold text-white py-10'>Cuestionarios de muestra ISTQB Foundation</h1>
          <input
            type='email'
            placeholder='Correo electrónico'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-300 rounded-lg px-4 py-2 m-2 focus:outline-none focus:border-blue-500'
          />
          <input
            type='password'
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-300 rounded-lg px-4 py-2 m-2 focus:outline-none focus:border-blue-500'
          />
          <button onClick={handleLogin} className='bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>Iniciar sesión</button>
          {loginError && <p className='text-red-500 mt-2'>{loginError}</p>}
        </div>

      )}
    </div>
  );
}
