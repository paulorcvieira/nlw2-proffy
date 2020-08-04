import React from 'react'

import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/20549869?s=400&u=9246673b152fc44b412d965429b208d4928c9306&v=4" alt="Paulo Vieira"/>
        <div>
          <strong>Paulo Vieira</strong>
          <span>Direito Processual Penal</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias.
        <br /><br />
        Apaixonado por direito penal e processual penal e por contribuir com a sociedade através de conteúdos inteligentes.
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ 200,00</strong>
        </p>
          <button type="button">
            <img src={whatsappIcon} alt="Whatsapp" />
            Entrar em contato
          </button>
      </footer>
    </article>
  )
}

export default TeacherItem