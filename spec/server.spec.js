//Test specis written for jasmine
//By: Yousef Emadi

// request package to send req for API handling
const request = require('request');
const url01 = 'http://localhost:3000/messages';
const url02 = 'http://localhost:3000/messages/tom';

describe('calc', ()=>{
    it('it should multiply 2 and 2 ', ()=>{
        expect(2*2).toBe(4);
    })
});

describe('get messages', () => {
    it('should return 200 OK', (done) => {
        request.get(url01, (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    })
});

describe('get messages from a user', () => {
    it('should return 200 OK', (done) => {
        request.get(url02, (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    it('should be for username tom', (done) => {
        request.get(url02, (err, res) => {
            expect(JSON.parse(res.body)[0].username).toEqual('tom');
            done();
        });
    });
    
});

