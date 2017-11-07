// Based On: https://github.com/aikoven/typescript-fsa

export interface AnyAction {
  type: any;
}

export type Meta = null | { [key: string]: any };

export interface FsaAction<P> extends AnyAction {
  type: string;
  payload: P;
  error?: boolean;
  meta?: Meta;
}

export interface Success<S> {
  result: S;
}

export interface Failure<E> {
  error: E;
}

export function isType<P>(
  action: AnyAction,
  actionCreator: ActionCreator<P>
): action is FsaAction<P> {
  return action.type === actionCreator.type;
}

export interface ActionCreator<P> {
  type: string;
  match: (action: AnyAction) => action is FsaAction<P>;
  (payload?: P, meta?: Meta): FsaAction<P>;
}

export interface EmptyActionCreator extends ActionCreator<undefined> {
  (payload?: undefined, meta?: Meta): FsaAction<undefined>;
}

export interface AsyncActionCreators<P, S, E> {
  type: string;
  started: ActionCreator<P>;
  done: ActionCreator<S>;
  failed: ActionCreator<E>;
}

export interface ActionCreatorFactory {
  (type: string, commonMeta?: Meta, error?: boolean): EmptyActionCreator;
  <P>(type: string, commonMeta?: Meta, isError?: boolean | ((payload: P) => boolean)): ActionCreator<P>;

  async<P, S>(type: string, commonMeta?: Meta): AsyncActionCreators<P, S, any>;
  async<P, S, E>(type: string, commonMeta?: Meta): AsyncActionCreators<P, S, E>;
}

declare const process: {
  env: {
    NODE_ENV?: string;
  };
};

export function actionCreatorFactory(
  prefix?: string | null,
  defaultIsError: (payload: any) => boolean = p => p instanceof Error
): ActionCreatorFactory {
  const actionTypes: { [type: string]: boolean } = {};

  const base = prefix ? `${prefix}/` : '';

  function actionCreator<P>(
    type: string,
    commonMeta?: Meta,
    isError: ((payload: P) => boolean) | boolean = defaultIsError
  ): ActionCreator<P> {
    const fullType = base + type;

    if (process.env.NODE_ENV !== 'production') {
      if (actionTypes[fullType]) {
        throw new Error(`Duplicate action type: ${fullType}`);
      }

      actionTypes[fullType] = true;
    }

    return Object.assign(
      (payload: P, meta?: Meta) => {
        const action: FsaAction<P> = {
          type: fullType,
          payload
        };

        if (commonMeta || meta) {
          action.meta = Object.assign({}, commonMeta, meta);
        }

        if (isError && (typeof isError === 'boolean' || isError(payload))) {
          action.error = true;
        }

        return action;
      },
      {
        type: fullType,
        toString: () => fullType,
        match: (action: AnyAction): action is FsaAction<P> =>
          action.type === fullType
      }
    );
  }

  function asyncActionCreators<P, S, E>(
    type: string,
    commonMeta?: Meta
  ): AsyncActionCreators<P, S, E> {
    return {
      type: base + type,
      started: actionCreator<P>(`${type}_STARTED`, commonMeta, false),
      done: actionCreator<S>(`${type}_DONE`, commonMeta, false),
      failed: actionCreator<E>(`${type}_FAILED`, commonMeta, true)
    };
  }

  return Object.assign(actionCreator, { async: asyncActionCreators });
}

export default actionCreatorFactory;
