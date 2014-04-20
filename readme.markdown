# quote-stream

transform a stream into a quoted string

# example

``` js
var quote = require('quote-stream');
process.stdin.pipe(quote()).pipe(process.stdout);
```

output:

```
$ echo beep boop | node example/stream.js
"beep boop\n"
```

# methods

``` js
var quote = require('quote-stream')
```

## var q = quote()

Return a transform stream `q` that wraps input in double quotes and adds escape
characters to the chunks.

# install

With [npm](https://npmjs.org) do:

```
npm install quote-stream
```

# license

MIT
