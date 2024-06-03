import React, { useEffect, useState } from 'react';
import Formulario from '../components/Formulario';
import Lista from '../components/Lista';

import style from './App.module.scss';
import Cronometro from '../components/Cronometro';
import { ITarefa } from '../types/ITarefa';
import { segundosParaTempo } from '../common/utils/time';
import axios from 'axios';

function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [selecionado, setSelecionado] = useState<ITarefa>();

  useEffect(() => {
    carregarTarefas()
  }, []);

  async function carregarTarefas() {
    axios.get('http://127.0.0.1:8000/')
      .then(resposta => {
        setTarefas(resposta.data)
      })
      .catch(erro => {
        console.log(erro)
      });
  }

  function salvarTarefas() {
    tarefas.forEach(tarefa => {
      salvarTarefa(tarefa);
    });
  }

  async function salvarTarefa(tarefa: ITarefa) {
    axios.post('http://127.0.0.1:8000/', {
      ...tarefa
    });
    carregarTarefas();
  }

  function selecionarTarefa(tarefaSelecionada: ITarefa) {
    setSelecionado(tarefaSelecionada);
    setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.id === tarefaSelecionada.id ? true : false
    })));
    salvarTarefa({
      ...tarefaSelecionada,
      selecionado: true
    });
  };

  function atualizarTarefa(tempoRestante: number) {
    if(selecionado) {
      console.log(tempoRestante);
      console.log(segundosParaTempo(tempoRestante));
      if (tempoRestante <= 0) {
        setSelecionado(undefined);
      }
      setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => {
        if(tarefa.id === selecionado.id) {
          tarefa.tempoRestante = segundosParaTempo(tempoRestante);
          tarefa.selecionado = tempoRestante> 0;
          tarefa.completado = tempoRestante <= 0;
          salvarTarefa(tarefa);
          return tarefa;
        };
        return tarefa;
      }))
    }
  };

  return (
    <div className={style.AppStyle}>
      <Formulario 
        setTarefas={setTarefas}
        salvarTarefa={salvarTarefa}
      />
      <Lista
        tarefas={tarefas}
        selecionarTarefa={selecionarTarefa}
      />
      <Cronometro 
        selecionado={selecionado}
        atualizarTarefa={atualizarTarefa}
      />
    </div>
  );
};

export default App;
