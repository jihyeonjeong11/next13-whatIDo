import React from 'react';
import StyledTitlebar from './StyledTitleBar';
import Button from '../../common/Button';
import {
  CloseIcon,
  MaximizeIcon,
  MaximizedIcon,
  MinimizeIcon,
} from './WindowActionIcons';
import { useProcesses } from '@/app/contexts/process';
import { label } from '@/app/utils/functions';

type TitlebarProps = {
  id: string;
};

const TitleBar: FC<TitlebarProps> = ({ id, children }) => {
  const {
    processes: { [id]: process },
    close,
  } = useProcesses();

  return (
    <StyledTitlebar>
      <Button>
        <figure>
          <figcaption>title</figcaption>
        </figure>
      </Button>

      <nav className="cancel">
        {!false && (
          <Button
            className="minimize"
            //onClick={onMinimize}
            {...label('Minimize')}
          >
            <MinimizeIcon />
          </Button>
        )}
        {!false && (
          <Button
            className="maximize"
            //disabled={!allowResizing}
            //onClick={onMaximize}
            {...label('Maximize')}
          >
            {false ? <MaximizedIcon /> : <MaximizeIcon />}
          </Button>
        )}
        <Button className="close" onClick={() => close(id)} {...label('Close')}>
          <CloseIcon />
        </Button>
      </nav>
      {children}
    </StyledTitlebar>
  );
};

export default TitleBar;
