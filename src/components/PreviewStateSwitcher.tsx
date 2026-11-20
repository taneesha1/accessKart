import { Button, Tooltip } from '@fluentui/react-components';
import { useSyncExternalStore } from 'react';
import { getPreviewState, setPreviewState, subscribePreviewState, type PreviewDataState } from '../api/previewState';
import { useStore } from '../context/StoreContext';

const states: PreviewDataState[] = ['data', 'loading', 'empty', 'error'];

export function PreviewStateSwitcher() {
  const state = useSyncExternalStore(subscribePreviewState, getPreviewState, getPreviewState);
  const { refresh } = useStore();
  if (!import.meta.env.DEV) return null;
  return (
    <div className="preview-switcher" role="group" aria-label="Preview data state">
      <span>Preview</span>
      {states.map((next) => <Tooltip key={next} content={`Show ${next} state`} relationship="label"><Button size="small" appearance={state === next ? 'primary' : 'subtle'} aria-pressed={state === next} onClick={() => { setPreviewState(next); refresh(); }}>{next}</Button></Tooltip>)}
    </div>
  );
}
