import React, { Component } from 'react';
import './App.css';

import Comentario from './components/Comentario';

class App extends Component {

  state = {
    comentarios: [
      {
        nome: 'Silvania',
        email: 'silvania@email.com',
        data: new Date(2025, 4, 25, 17, 40, 0),
        mensagem: 'Olá, tudo bem?'
      },
      {
        nome: 'Safira',
        email: 'safira@email.com',
        data: new Date(2015, 12, 18, 12, 15, 0),
        mensagem: 'Tudo sim, e você?'
      }
    ],
    novoComentario: {
      nome: '',
      email: '',
      mensagem: ''
    }
  }

  adicionarComentario = evento => {
    evento.preventDefault(); //Anula o evento
    const novoComentario = {...this.state.novoComentario, data: new Date()}
    this.setState({
      comentarios: [...this.state.comentarios, novoComentario],
      novoComentario: {nome: '', email: '', mensagem: ''}
    })
  }

  removerComentario = comentario => {
    let lista = this.state.comentarios;
    lista = lista.filter(c => c !== comentario)
    this.setState({comentarios: lista})
  }

  digitacao = evento => {
    const {name, value} = evento.target;
    this.setState({novoComentario: {...this.state.novoComentario, [name]: value}})
  }

  render() {
    return (
      <div className="App">
        <h1>Meu projeto</h1>
        {this.state.comentarios.map((comentario, indice) => (
          <Comentario
            key={indice}
            nome={comentario.nome}
            email={comentario.email}
            data={comentario.data}
            onRemove={this.removerComentario.bind(this, comentario)}>
            {comentario.mensagem}
          </Comentario>
        ))}

        <form method="post" onSubmit={this.adicionarComentario} className="Novo-Comentario">
          <h2>Adicionar comentário</h2>
          <div>
            <input
              type="text" 
              name="nome" 
              placeholder='Digite seu nome' 
              value={this.state.novoComentario.nome}
              onChange={this.digitacao}
              required>
            </input>
          </div>
          <div>
            <input
              type="email" 
              name="email" 
              placeholder='Digite seu e-mail' 
              required
              value={this.state.novoComentario.email}
              onChange={this.digitacao}>
            </input>
          </div>
          <div>
            <textarea
              name="mensagem" 
              rows="4" 
              required
              value={this.state.novoComentario.mensagem}
              onChange={this.digitacao}>
            </textarea>
          </div>
          <button type="submit">Adicionar comentário</button>
        </form>
      </div>
    );
  }
}  

export default App;
