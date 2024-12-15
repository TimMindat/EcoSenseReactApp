import { useNavigate } from 'react-router-dom';
import { useGestures } from './useGestures';

export function useSwipeNavigation(element: HTMLElement | null) {
  const navigate = useNavigate();

  useGestures(element, {
    onSwipe: (direction) => {
      switch (direction) {
        case 'right':
          navigate(-1); // Go back
          break;
        case 'left':
          // Could be used for forward navigation or menu opening
          break;
      }
    }
  });
}