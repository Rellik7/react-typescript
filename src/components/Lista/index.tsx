import style from './Lista.module.scss';
import Item from './Item';
import { ITarefa } from '../../types/ITarefa';

interface Props {
  tarefas: ITarefa[],
  selecionarTarefa: (tarefaSelecionada: ITarefa) => void
}


export default function Lista({ tarefas, selecionarTarefa }: Props ) {
  return (
    <aside className={style.listaTarefas}>
      <h2> Tarefas do dia</h2>
      <ul>
        {tarefas.map((item) => (
          <Item
            selecionarTarefa={selecionarTarefa}
            key={item.id}
            {...item}
          />
        ))}
      </ul>
    </aside>
  )
};
