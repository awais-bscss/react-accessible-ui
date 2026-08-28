import { ModalDemo } from './components/Demo/ModalDemo';
import { TabsDemo } from './components/Demo/TabsDemo';
import { AccordionDemo } from './components/Demo/AccordionDemo';

export default function App() {
  return (
    <main className="app">
      <header className="page-header">
        <h1 className="page-header__title">Accessible UI Components</h1>
        <p className="page-header__sub">
          Modal · Tabs · Accordion built with Compound Components,
          Custom Hooks, Context, and full keyboard + ARIA support.
        </p>
      </header>

      <ModalDemo />
      <TabsDemo />
      <AccordionDemo />
    </main>
  );
}
