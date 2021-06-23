/**
 * @jest-environment jsdom
 */
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import Dashboard from '../src/components/dashboard/Dashboard';
import GuestList from '../src/components/dashboard/GuestList';
import DesignerList from '../src/components/dashboard/DesignerList';


configure({ adapter: new Adapter() });
describe('Test case for testing dashboard', () => {
    it('Should Render Dashboard Page', () => {
        shallow(<Dashboard />);
    });

    it('Should have Guests List Component', () => {
        const login = shallow(<Dashboard />);
        expect(login.containsMatchingElement(<GuestList />)).toEqual(true);
    });

    it('Should have Designers List Component', () => {
        const login = shallow(<Dashboard />);
        expect(login.containsMatchingElement(<DesignerList />)).toEqual(true);
    });

});
