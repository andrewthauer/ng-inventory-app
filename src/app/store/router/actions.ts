import { NavigationExtras } from '@angular/router';
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export interface RouterActionPayload {
  path: string[] | any[];
  query?: object;
  extras?: NavigationExtras;
}

export const routerActions = {
  go: actionCreator<RouterActionPayload>('ROUTER_GO'),
  forward: actionCreator('ROUTER_FORWARD'),
  back: actionCreator('ROUTER_BACK'),
};
