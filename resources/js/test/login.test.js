import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import Login from '../src/components/auth/Login';
import EmailForm from '../src/components/auth/EmailForm';
import PasswordForm from '../src/components/auth/PasswordForm';

configure({ adapter: new Adapter() });
describe('Test case for testing login', () => {
    it('Should Render Login Page', () => {
        shallow(<Login />);
    });

    it('Should have email and password input', () => {
        const login = shallow(<Login />);
        expect(login.containsMatchingElement(<EmailForm />)).toEqual(true);
        expect(login.containsMatchingElement(<PasswordForm />)).toEqual(true);
    });
});