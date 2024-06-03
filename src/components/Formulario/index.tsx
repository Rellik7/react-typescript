import React, { useState } from 'react';
import Botao from '../Botao';
import style from './Formulario.module.scss';
import { ITarefa } from '../../types/ITarefa';

interface Props {
  setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>
  salvarTarefa: (tarefa: ITarefa) => void
}

export default function Formulario({ setTarefas, salvarTarefa }: Props) {
  const [tarefa, setTarefa] = useState('');
  const [tempo, setTempo] = useState('00:00');
  const [tempoRestante, setTempoRestante] = useState('00:00')
  
  function adicionarTarefa(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const novaTarefa = {
      tarefa,
      tempo,
      tempoRestante,
      selecionado: false,
      completado: false,
      id: 0
    }
    setTarefas(tarefasAnteriores => 
      [
        ...tarefasAnteriores, 
        novaTarefa
      ]
    );
    setTarefa('');
    setTempo('00:00');
    setTempoRestante('00:00');
    salvarTarefa(novaTarefa);
  };

  return (
    <form className={style.novaTarefa} onSubmit={adicionarTarefa}>
        <div className={style.inputContainer}>
          <label htmlFor='tarefa'>
            Adicione uma nova tarefa
          </label>
          <input
            type='text'
            name='tarefa'
            id='tarefa'
            value={tarefa}
            onChange={evento => setTarefa(evento.target.value)}
            placeholder='O que você quer fazer'
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor='tempo'>
            Tempo
          </label>
          <input
            type='time'
            step='1'
            name='tempo'
            id='tempo'
            value={tempo}
            onChange={evento => {
              setTempo(evento.target.value)
              setTempoRestante(evento.target.value)
            }}
            min='00:00:00'
            max='01:30:00'
            required
          />
        </div>
        <Botao type='submit'>
          Adicionar
        </Botao>
      </form>
  );
};