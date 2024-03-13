import {ChakraProvider} from '@chakra-ui/react';
import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";
import Home from "./pages/home/Home";
import Theme from "../styles/globalTheme";

const App = () => <ChakraProvider><TimescaleLogo /><Home /></ChakraProvider>;

export default App;
