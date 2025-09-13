import { Droppable, Draggable } from 'react-beautiful-dnd';
import usePrintMode from '../../hooks/usePrintMode';

// Print-safe Droppable wrapper
export const PrintSafeDroppable = ({ droppableId, children, className = "", ...props }) => {
  const isPrintMode = usePrintMode();

  if (isPrintMode) {
    // Render a plain div in print mode
    return (
      <div className={className} {...props}>
        {children({
          droppableProps: {},
          innerRef: () => {},
          placeholder: null
        })}
      </div>
    );
  }

  // Render normal Droppable in edit mode
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div 
          className={className} 
          {...provided.droppableProps} 
          ref={provided.innerRef}
          {...props}
        >
          {children(provided)}
        </div>
      )}
    </Droppable>
  );
};

// Print-safe Draggable wrapper
export const PrintSafeDraggable = ({ draggableId, index, children, className = "", ...props }) => {
  const isPrintMode = usePrintMode();

  if (isPrintMode) {
    // Render a plain div in print mode
    return (
      <div className={className} {...props}>
        {children({
          draggableProps: {},
          dragHandleProps: {},
          innerRef: () => {}
        })}
      </div>
    );
  }

  // Render normal Draggable in edit mode
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          className={className}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          {...props}
        >
          {children(provided)}
        </div>
      )}
    </Draggable>
  );
};