import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';

function Portal({children}) {
  const mount = document.getElementById('portal-root');
  const el = document.createElement('div');

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [mount, el]);

  return createPortal(children, el);
}

export default Portal;
