export type PreviewDataState = 'data' | 'loading' | 'empty' | 'error';
type Listener = () => void;

const listeners = new Set<Listener>();
const valid = (value: string | null): value is PreviewDataState =>
  value === 'data' || value === 'loading' || value === 'empty' || value === 'error';

const queryState = new URLSearchParams(window.location.search).get('previewState');
const storedState = window.localStorage.getItem('previewState');
let currentState: PreviewDataState = import.meta.env.PROD
  ? 'data'
  : valid(queryState) ? queryState : valid(storedState) ? storedState : 'data';

export function getPreviewState(): PreviewDataState {
  return import.meta.env.PROD ? 'data' : currentState;
}

export function setPreviewState(next: PreviewDataState): void {
  if (import.meta.env.PROD) return;
  currentState = next;
  window.localStorage.setItem('previewState', next);
  listeners.forEach((listener) => listener());
}

export function subscribePreviewState(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
