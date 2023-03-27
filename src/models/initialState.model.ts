import { IAvailableRecipient } from './recipients.model';

export interface IActionType {
  type: string;
}

export interface IAction extends IActionType {
  payload: {
    [key: string]: any;
  }
}

export interface IInitialState {
  availableRecipients: IAvailableRecipient[];
}
