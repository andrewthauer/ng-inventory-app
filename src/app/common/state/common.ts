import * as R from 'ramda';

export const handleError = (state: any, err: Error | any) => ({ ...state, error: err });
export const startedFetching = (state: any, err: Error | any): any => ({ ...state, isBusy: true });
export const finishedFetching = (state: any, err: Error | any): any => ({ ...state, isBusy: false });
