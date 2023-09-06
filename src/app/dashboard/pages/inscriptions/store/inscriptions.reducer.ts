import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, state => state),

);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

