import { StyleSheetManager, ThemeProvider } from 'styled-components';

const StyledApp: FC = ({ children }) => {
  //const { themeName } = useSession();

  return <StyleSheetManager enableVendorPrefixes>{children}</StyleSheetManager>;
};

export default StyledApp;
