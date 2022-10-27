import React from 'react';
import cls from './modal.module.scss';

export const Modal = ({ id = '', className = '', isOpen, setIsOpen, children }) => {
  return (
    <div
      className={[cls.container, isOpen && cls.open].join(' ')}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <div className={cls.wrapper}>
        <div
          className={[cls.content, className, isOpen && cls.open].join(' ')}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export const UncloseblModal = ({ id = '', className = '', isOpen, setIsOpen, children }) => {
  if (document.getElementById(id)) dragElement(document.getElementById(id));
  return (
    <div id={id} className={[cls.unclosebl, cls.container, isOpen && cls.open].join(' ')}>
      <div id={id + 'header'} className={cls.mover}></div>
      <div className={cls.wrapper}>
        <div
          className={[cls.content, className, isOpen && cls.open].join(' ')}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + 'header')) {
    // если присутствует, заголовок - это место, откуда вы перемещаете DIV:
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
  } else {
    // в противном случае переместите DIV из любого места внутри DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // получить положение курсора мыши при запуске:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // вызов функции при каждом перемещении курсора:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // вычислить новую позицию курсора:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // установите новое положение элемента:
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    // остановка перемещения при отпускании кнопки мыши:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
