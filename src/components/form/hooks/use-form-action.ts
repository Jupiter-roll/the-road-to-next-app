import { useFormState } from 'react-dom';
import { useEffect, useRef } from 'react';
import { EMPTY_FORM_STATE } from '../utils/to-form-state';

type UseFormActionAction<State, Payload> =
  | ((state: Awaited<State>) => State | Promise<State>)
  | ((
      state: Awaited<State>,
      payload: Payload
    ) => State | Promise<State>);

type OnSettledArgs<K> = {
  formState: Awaited<K>;
  reset: () => void;
};

type InitialState<K> = Awaited<
  Omit<K, 'status' | 'message' | 'fieldErrors' | 'timestamp'>
>;

type UseFormActionOptions<K> = {
  initialState?: InitialState<K>;
  onSettled?: (onSettledArgs: OnSettledArgs<K>) => void;
};

const useFormAction = <State, Payload>(
  action: UseFormActionAction<State, Payload>,
  options?: UseFormActionOptions<State>
) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleReset = () => {
    if (!formRef.current) return;
    formRef.current.reset();
  };

  const [formState, formAction] = useFormState(action, {
    ...EMPTY_FORM_STATE,
    ...(options?.initialState ?? {}),
  } as Awaited<State>);

  const typedFormState = formState as typeof formState &
    typeof EMPTY_FORM_STATE;

  const prevTimestamp = useRef(typedFormState.timestamp);

  useEffect(() => {
    const isNewTimeStamp =
      typedFormState.timestamp !== prevTimestamp.current;

    if (isNewTimeStamp) {
      if (options?.onSettled) {
        options.onSettled({
          formState: typedFormState,
          reset: handleReset,
        });
      }

      prevTimestamp.current = typedFormState.timestamp;
    }
  }, [typedFormState, options]);

  return {
    formState: typedFormState,
    action: formAction,
    ref: formRef,
  };
};

export { useFormAction };
