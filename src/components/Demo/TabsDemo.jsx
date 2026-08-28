import { Tabs } from '../Tabs/Tabs';
import { Section } from './Section';
import { TAB_ITEMS } from '../../constants/data';

export function TabsDemo() {
  return (
    <Section
      tag="02 Tabs"
      title="Keyboard-Navigable Tabs"
      desc="Arrow keys navigate between tabs (roving tabindex). Home / End jump to first / last. ARIA: role=tablist, role=tab, role=tabpanel, aria-selected, aria-controls."
    >
      <div className="card">
        <Tabs.Root defaultIndex={0} id="main-tabs">
          <Tabs.List label="React concepts">
            {TAB_ITEMS.map((t, i) => (
              <Tabs.Trigger key={i} index={i}>{t.label}</Tabs.Trigger>
            ))}
          </Tabs.List>
          {TAB_ITEMS.map((t, i) => (
            <Tabs.Panel key={i} index={i}>
              {t.content}
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>
    </Section>
  );
}
