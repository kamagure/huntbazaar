import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import ForgotPassword from '../src/components/auth/ForgotPassword';
import EmailForm from '../src/components/auth/EmailForm';

configure({ adapter: new Adapter() });
describe('Test case for testing forgot password', () => {
    it('Should Render Forgot Password Page', () => {
        shallow(<ForgotPassword />);
    });

    it('Should have email', () => {
        const login = shallow(<ForgotPassword />);
        expect(login.containsMatchingElement(<EmailForm />)).toEqual(true);
    });
});
