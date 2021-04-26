import { FC, ChangeEvent, DragEvent } from 'react';

const EventComponent: FC = () => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    console.log(event);
  };

  return (
    <div>
      <input onChange={onChange} />
      <div draggable onDragStart={onDragStart}>
        Drag me!
      </div>
    </div>
  );
};

export default EventComponent;
