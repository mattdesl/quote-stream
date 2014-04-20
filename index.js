var through = require('through2');
var buffers = {
    quote: Buffer('"'),
    escapeQuote: Buffer('\\"'),
    escapeEscape: Buffer('\\\\'),
    escapeB: Buffer('\\b'),
    escapeF: Buffer('\\f'),
    escapeN: Buffer('\\n'),
    escapeR: Buffer('\\r'),
    escapeT: Buffer('\\t')
};

var codes = {
    quote: '"'.charCodeAt(0),
    escape: '\\'.charCodeAt(0),
    b: '\b'.charCodeAt(0),
    f: '\f'.charCodeAt(0),
    n: '\n'.charCodeAt(0),
    r: '\r'.charCodeAt(0),
    t: '\t'.charCodeAt(0)
};

var map = {};
map[codes.quote] = buffers.escapeQuote;
map[codes.escape] = buffers.escapeEscape;
map[codes.b] = buffers.escapeB;
map[codes.f] = buffers.escapeF;
map[codes.n] = buffers.escapeN;
map[codes.r] = buffers.escapeR;
map[codes.t] = buffers.escapeT;

module.exports = function () {
    var stream = through(write, end);
    stream.push(buffers.quote);
    return stream;
    
    function write (buf, enc, next) {
        var offset = 0;
        for (var i = 0; i < buf.length; i++) {
            var m = map[buf[i]];
            if (m) {
                var bufs = [ buf.slice(offset, i), m ];
                this.push(Buffer.concat(bufs));
                offset = i + 1;
            }
        }
        if (offset === 0) this.push(buf)
        else this.push(buf.slice(offset));
        next();
    }
    function end (next) {
        this.push(buffers.quote);
        this.push(null);
    }
};
