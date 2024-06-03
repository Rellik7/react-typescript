import { ITarefa } from '../../../types/ITarefa';
import style from './Item.module.scss';

interface Props extends ITarefa {
  selecionarTarefa: (tarefaSelecionada: ITarefa) => void
}

export default function Item({tarefa, tempo, tempoRestante, selecionado, completado, id, selecionarTarefa}: Props) {
  return (
    <li 
      className={`${style.item} ${selecionado ? style.itemSelecionado : ''} ${completado ? style.itemCompletado : ''}`} 
      onClick={() => !completado && selecionarTarefa({
        tarefa,
        tempo,
        tempoRestante,
        selecionado,
        completado,
        id
      })}>
      <h3> {tarefa} </h3>
      <span> {tempoRestante.trim()}/{tempo}</span>
      {completado && 
        <span className={style.concluido} aria-label='tarefa completada'>

        </span>
      }
    </li>
  )
};
