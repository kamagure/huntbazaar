/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
 import { shallow, configure } from 'enzyme';
 import Setting from '../src/components/setting/Setting';
 
 
 configure({ adapter: new Adapter() });
 describe('Test case for testing setting', () => {
     it('Should Render Setting Page', () => {
         shallow(<Setting />);
     });
 
     it('Should have Input type datetime and Button Submit', () => {
         const setting = shallow(<Setting />);
         expect(setting.find('#datetime-local')).toHaveLength(1);
         expect(setting.find('.btn')).toHaveLength(1);
     });
 
 });
 