import { useEffect, useRef } from 'react';
/**
 * Keeps track of a previous value to compare with the current value
 * @param  {any} value
 */
const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
