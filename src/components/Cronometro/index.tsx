import Botao from '../Botao';
import Relogio from './Relogio';
import style from './Cronometro.module.scss';
import { ITarefa } from '../../types/ITarefa';
import { useEffect, useRef, useState } from 'react';
import { tempoParaSegundos } from '../../common/utils/time';

interface Props {
  selecionado: ITarefa | undefined,
  atualizarTarefa: (tempoRestante: number) => void
};

export default function Cronometro({ selecionado, atualizarTarefa }: Props) {
  const [tempo, setTempo] = useState<number>();
  const pause = useRef(false)

  useEffect(() => {
    if (selecionado?.tempoRestante) {
      setTempo(tempoParaSegundos(selecionado.tempoRestante));
    };
  }, [selecionado]);

  function regressiva(contador: number = 0) {
    setTimeout(() => {
      if(contador > 0 && !pause.current) {
        setTempo(contador - 1);
        return regressiva(contador - 1);
      };
      atualizarTarefa(contador);
      pause.current = !pause
    }, 1000);
  };

  return (
    <div className={style.cronometro}>
      <p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
      <div className={style.relogioWrapper}>
        <Relogio tempo={tempo} />
      </div>
      <div>
        <Botao onCLick={() => regressiva(tempo)}>
          Iniciar
        </Botao>
        <Botao onCLick={() => { pause.current = true }}>
          Pausar
        </Botao>
      </div>
    </div>
  );
};
