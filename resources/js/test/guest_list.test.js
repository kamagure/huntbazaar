/**
 * @jest-environment jsdom
 */
import React from 'react';
import axios from 'axios';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure, mount } from 'enzyme';
import GuestCreate from '../src/components/guestlist/Create';
import GuestList from '../../../__mocks__/GuestList';
import GuestDetail from '../../../__mocks__/GuestDetail';
// import GuestIndex from '../src/components/guestlist/GuestIndex';
// import GuestDetail from '../src/components/guestlist/Detail';

jest.mock('axios');
configure({ adapter: new Adapter() });
describe('Test case for testing guest list', () => {
    it('Should Render Guest Invite Page', () => {
        shallow(<GuestCreate />);
    });

    it('Should Have Input type Email and Invite Button', () => {
        const guestCrate = shallow(<GuestCreate />);
        expect(guestCrate.find('#email')).toHaveLength(1);
        expect(guestCrate.find('.btn')).toHaveLength(1);
    });

    it('Should Fetch Guest List', () => {
        const users = [];
        const resp = { data: users };
        jest.spyOn(axios, 'get').mockResolvedValue(resp)
        return GuestList.all().then(data => expect(data).toEqual(users));
    });

    it('Should Fetch Guest Detail', () => {
        const users = [];
        const resp = { data: users };
        jest.spyOn(axios, 'get').mockResolvedValue(resp)
        return GuestDetail.all().then(data => expect(data).toEqual(users));
    });

});
