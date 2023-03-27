import React from 'react';
import { IAction, IInitialState } from "./initialState.model";

export interface ILayoutContextProps {
  data: IInitialState;
  onDispatch: React.Dispatch<IAction>
}
