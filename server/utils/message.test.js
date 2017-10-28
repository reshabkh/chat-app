var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',()=>{
  it('it should generate correct message object',()=>{
    var from = 'reshab';
    var text = 'chat message';
    var message = generateMessage(from,text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from,text});
  });
});
