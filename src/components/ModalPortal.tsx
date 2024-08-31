import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: ReactNode;
}

export default function ModalPortal({ children }: Props) {
  const el = document.getElementById('modal-root') as HTMLElement;

  return ReactDOM.createPortal(children, el);
}
