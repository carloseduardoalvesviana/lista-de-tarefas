import PropTypes from 'prop-types';

export const TodoListItem = ({ task, onChecked, onDelete, onSetTaskEdit }) => {
  return (
    <li>
      <input type="checkbox" checked={task.complete} onChange={() => onChecked(task)} />
      <span>{task.name}</span>
      <button type="button" className="delete" onClick={() => onDelete(task)}>Deletar</button>
      <button type="button" className="update" onClick={() => onSetTaskEdit(task)}>Atualizar</button>
    </li>
  )
}

TodoListItem.defaultProps = {
  // tudo é obrigatorio
}

TodoListItem.propTypes = {
  task: PropTypes.object.isRequired,
  onChecked: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSetTaskEdit: PropTypes.func.isRequired,
}