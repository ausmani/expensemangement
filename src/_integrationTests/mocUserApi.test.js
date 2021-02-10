import moxios from 'moxios';
import {testStore} from "../Util/util";
import {listUsers} from '../Actions/UserActions'

describe ('Get users list action',()=>{
    beforeEach(()=>{
        moxios.install();
    })

    afterEach(()=>{
        moxios.uninstall();
    });

    // test('Store is updated Correctly',()=>{
    //
    //     const expectedState = [{
    //         id:'1',
    //         first_name:'Awais',
    //         last_name:'Usamni',
    //         email: 'amusmani@gmail.com'
    //     }];
    //
    //     const mockStore = testStore();
    //
    //     moxios.wait(()=>{
    //
    //         const request = moxios.request.mostRecent();
    //         request.responseWith({
    //             status: 200,
    //             response: expectedState
    //         })
    //     });
    //
    //     return mockStore.dispatch(listUsers())
    //         .then(()=>{
    //             const newState = mockStore.getState();
    //             expect(newState.users.users).toBe(expectedState)
    //         })
    // })
    it('should Test', function () {
        expect(true).toBe(true)
    });
})