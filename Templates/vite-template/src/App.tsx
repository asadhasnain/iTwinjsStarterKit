import { Button, Checkbox, LabeledInput, Radio, SearchBox } from '@itwin/itwinui-react';

export default function App() {
  return (
    <>
      <Button>Default</Button>
      <Checkbox  label='Checkbox' defaultChecked />
      <Radio name='Options' label='Option 1' defaultChecked />
      <Radio name='Options' label='Option 2' />
      <LabeledInput label='Label' placeholder='Placeholder' message='Hint message'/>
      <SearchBox inputProps={{ placeholder: 'Search...' }} />
    </>
  );
}
