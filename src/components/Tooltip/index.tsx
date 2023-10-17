import { ReactNode, useCallback, useEffect, useState } from 'react';

import styles from './tooltip.module.css';

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  useMouseInteractions?: boolean;
  active?: boolean;
  full?: boolean;
  direction?: string;
};

const Tooltip = ({ content, children, useMouseInteractions = true, active, full, direction }: TooltipProps) => {
  const [isActive, setActive] = useState(active);
  const onMouseOver = useCallback(() => {
    useMouseInteractions && setActive(true);
  }, [useMouseInteractions, setActive]);
  const onMouseOut = useCallback(() => {
    useMouseInteractions && setActive(false);
  }, [useMouseInteractions, setActive]);

  useEffect(() => {
    setActive(active);
  }, [active, setActive]);

  return (
    <div className={styles.wrap} data-full={full} onMouseOver={onMouseOver} onMouseLeave={onMouseOut}>
      {children}
      {isActive && (
        <div className={styles.content} data-direction={direction || 'top'}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
