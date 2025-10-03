import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export const useInfiniteScroll = ({ 
  onLoadMore, 
  hasMore, 
  isLoading 
}: UseInfiniteScrollProps) => {
  const [targetRef, setTargetRef] = useState<HTMLElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [onLoadMore, hasMore, isLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '80px', // Trigger 80px before reaching the bottom
      threshold: 0.1
    });

    if (targetRef) {
      observer.observe(targetRef);
    }

    return () => {
      if (targetRef) {
        observer.unobserve(targetRef);
      }
    };
  }, [targetRef, handleObserver]);

  return { setTargetRef };
};