import React, { useEffect, useState } from 'react';
import './HomePage.css';

function HomePage() {
  const [userCount, setUserCount] = useState(null); 
  const [displayedCount, setDisplayedCount] = useState(0); 
  const [userName, setUserName] = useState(''); // Novo estado para armazenar o nome do usuário

  useEffect(() => {
    // Função para buscar a quantidade de usuários e o nome do usuário logado
    async function fetchData() {
      try {
        const response = await fetch('URL_DA_API/quantidadeUsuariosENomeUsuario'); // Substitua pela URL correta da API
        const data = await response.json();
        setUserCount(data.count); // Define a quantidade de usuários
        setUserName(data.userName); // Define o nome do usuário logado
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }
    
    fetchData(); 
  }, []);

  useEffect(() => {
    if (userCount !== null) {
      let count = 0;
      const increment = Math.ceil(userCount / 100); 
      const interval = setInterval(() => {
        count += increment;
        if (count >= userCount) {
          count = userCount;
          clearInterval(interval);
        }
        setDisplayedCount(count); 
      }, 20); 
      
      return () => clearInterval(interval);
    }
  }, [userCount]);

  return (
    <div className='container-homePage'>
      <div className='container-homePage-conteudo'>
        <h1>Olá, {userName}</h1> {/* Exibe o nome do usuário logado */}
        <div className='box-content'>
          <div className='box'>
            <div className='box-left'>
              <p>Quantidade de Usuários</p>
            </div>
            <div className='box-right'>
              <p>{userCount !== null ? displayedCount : 'Carregando...'}</p>
            </div>
          </div>
          <div className='box'>
            <div className='box-left'>
              <p>Perfil Admin</p>
            </div>
            <div className='box-right'>
              <p>{userCount !== null ? displayedCount : 'Carregando...'}</p>
            </div>
          </div>
          <div className='box'>
            <div className='box-left'>
              <p>Perfil Aluno</p>
            </div>
            <div className='box-right'>
              <p>{userCount !== null ? displayedCount : 'Carregando...'}</p>
            </div>
          </div>
          <div className='box'>
            <div className='box-left'>
              <p>Perfil Professor</p>
            </div>
            <div className='box-right'>
              <p>{userCount !== null ? displayedCount : 'Carregando...'}</p>
            </div>
          </div>
        </div>
        
        <p>*TABELINHA DO BANCO COM 5 ÚLTIMOS </p>
      </div>
    </div>
  );
}

export default HomePage;