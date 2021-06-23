/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
 import { shallow, configure, mount } from 'enzyme';
 import Guest from '../src/components/fill-invite/FillInvite';
 import RegistrationCode from '../src/components/fill-invite/RegistrationCode';
 import { CopyToClipboard } from "react-copy-to-clipboard";

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

describe('Test case for testing guest page', () => {
    it('Should Render Guest Fill Invite Page', () => {
        shallow(<Guest />);
    });

    it('Should have Fill Invite Form', () => {
        const guest = shallow(<Guest />);
        expect(guest.find({ type: "email" })).toHaveLength(1);
        expect(guest.find({placeholder: "First Name"})).toHaveLength(1);
        expect(guest.find({placeholder: "Last Name"})).toHaveLength(1);
        expect(guest.find('#date')).toHaveLength(1);
        expect(guest.find('.basic-multi-select')).toHaveLength(1);
        expect(guest.find({ type: "submit" })).toHaveLength(1);
    });

    it('Should Render Registration Code Page', () => {
        shallow(<RegistrationCode />);
    });

    it('Should have Registration Code Component', () => {
        const registrationCode = shallow(<RegistrationCode />);
        expect(registrationCode.find({ type: "button" })).toHaveLength(1);
    });

});