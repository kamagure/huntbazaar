import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import ResetPassword from '../src/components/auth/ResetPassword';
import EmailForm from '../src/components/auth/EmailForm';
import PasswordForm from  '../src/components/auth/PasswordForm';

configure({ adapter: new Adapter() });
jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
      pathname: '/another-route',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa',
    }),
}));

describe('Test case for testing reset password', () => {
    it('Should Render Reset Password Page', () => {
        shallow(<ResetPassword />);
    });

    it('Should have password form', () => {
        const wrapper = shallow(<ResetPassword />);
        expect(wrapper.containsMatchingElement(<PasswordForm />)).toEqual(true);
    });

    it('Should have email form', () => {
        const wrapper = shallow(<ResetPassword />);
        expect(wrapper.containsMatchingElement(<EmailForm />)).toEqual(true);
    });
});
