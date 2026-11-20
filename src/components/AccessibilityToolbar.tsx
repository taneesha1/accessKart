import { Button, Card, CardHeader, Text } from '@fluentui/react-components';
import { AccessibilityRegular, ArrowDownRegular, ArrowUpRegular, EyeRegular, TextUnderlineRegular } from '@fluentui/react-icons';
import { useAccessibility } from '../context/AccessibilityContext';

export function AccessibilityToolbar() {
  const { preferences, update, reset } = useAccessibility();
  return (
    <Card className="accessibility-card" aria-label="Accessibility settings">
      <CardHeader
        image={<span className="toolbar-icon"><AccessibilityRegular /></span>}
        header={<Text weight="semibold">Make this page yours</Text>}
        description={<Text size={200} className="subtle-copy">Personalize your browsing experience</Text>}
        action={<span className="sr-only" aria-live="polite">Accessibility settings updated</span>}
      />
      <div className="accessibility-actions">
        <Button size="small" appearance="subtle" icon={<ArrowDownRegular />} aria-label="Decrease text size" onClick={() => update({ fontScale: Math.max(0.9, Math.round((preferences.fontScale - 0.1) * 10) / 10) })}>A−</Button>
        <Text size={200} aria-label={`Text size ${Math.round(preferences.fontScale * 100)} percent`}>{Math.round(preferences.fontScale * 100)}%</Text>
        <Button size="small" appearance="subtle" icon={<ArrowUpRegular />} aria-label="Increase text size" onClick={() => update({ fontScale: Math.min(1.3, Math.round((preferences.fontScale + 0.1) * 10) / 10) })}>A+</Button>
        <span className="toolbar-separator" aria-hidden="true" />
        <Button size="small" appearance={preferences.highContrast ? 'primary' : 'subtle'} icon={<EyeRegular />} aria-pressed={preferences.highContrast} onClick={() => update({ highContrast: !preferences.highContrast })}>Contrast</Button>
        <Button size="small" appearance={preferences.grayscale ? 'primary' : 'subtle'} icon={<EyeRegular />} aria-pressed={preferences.grayscale} onClick={() => update({ grayscale: !preferences.grayscale })}>Grayscale</Button>
        <Button size="small" appearance={preferences.underlineLinks ? 'primary' : 'subtle'} icon={<TextUnderlineRegular />} aria-pressed={preferences.underlineLinks} onClick={() => update({ underlineLinks: !preferences.underlineLinks })}>Underline links</Button>
        <Button size="small" appearance="subtle" onClick={reset}>Reset</Button>
      </div>
    </Card>
  );
}
