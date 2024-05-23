import style from './Lista.module.scss';
import Item from './Item';
import { ITarefa } from '../../types/ITarefa';

interface Props {
  tarefas: ITarefa[],
  selecionaTarefa: (tarefaSelecionada: ITarefa) => void
}


export default function Lista({ tarefas, selecionaTarefa }: Props ) {
  return (
    <aside className={style.listaTarefas}>
      <h2> Estudos do dia</h2>
      <ul>
        {tarefas.map((item) => (
          <Item
            selecionaTarefa={selecionaTarefa}
            key={item.id}
            {...item}
          />
        ))}
      </ul>
    </aside>
  )
};
