import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ValidationForm } from '../lib'
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
// Make Enzyme functions available in all test files without importing
global.doNothing = () => { };
global.defaultErrorMessage = ValidationForm.defaultErrorMessage;
