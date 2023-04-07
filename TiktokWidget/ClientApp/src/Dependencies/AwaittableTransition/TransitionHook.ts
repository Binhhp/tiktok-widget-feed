import {
  TransitionFunction,
  TransitionStartFunction,
  useCallback,
  useEffect,
  useRef,
  useTransition,
} from "react";

export default function useAwaitableTransition(): [
  boolean,
  TransitionStartFunction
] {
  const [isPending, startTransition] = useTransition();
  const resolveRef = useRef<(value?: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();

  const wrappedStartTransition = useCallback(
    (callback: TransitionFunction) => {
      return new Promise((resolve, reject) => {
        rejectRef.current?.();

        resolveRef.current = resolve;
        rejectRef.current = reject;

        startTransition(() => {
          callback();
        });
      });
    },
    [startTransition, rejectRef]
  );

  useEffect(() => {
    if (!isPending) {
      resolveRef.current?.();

      resolveRef.current = undefined;
      rejectRef.current = undefined;
    }
  }, [isPending]);

  return [isPending, wrappedStartTransition];
}
