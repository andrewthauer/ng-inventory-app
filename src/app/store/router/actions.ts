import { actionCreatorFactory } from 'typescript-fsa';
import { RouterActionPayload } from './state';

const actionCreator = actionCreatorFactory();

export const routerActions = {
  go: actionCreator<RouterActionPayload>('ROUTER_GO'),
  forward: actionCreator('ROUTER_FORWARD'),
  back: actionCreator('ROUTER_BACK'),
};
