import { useProcesses } from '@/app/contexts/process';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import AppsLoader from './AppsLoader';

const TestComp: FC = () => {
  return (
    <div>
      {"I'm test!"}
    </div>
  )
}

const StyledApp: FC = ({ children }) => {
  //const { themeName } = useSession();
  const {open, processes} = useProcesses()
  console.log(processes)

  return <StyleSheetManager enableVendorPrefixes>{children}
    <div>for test</div>
    <button aria-label="addComponent" onClick={() => open('1', {Component: TestComp})}>
      add component
    </button>
    <AppsLoader />
  </StyleSheetManager>;
};

export default StyledApp;
