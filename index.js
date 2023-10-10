
const fs = require('fs')
    , S = require('fluent-json-schema')
    , {default: {parse}} = require('restructured');

const rstUrl = 'https://raw.githubusercontent.com/bitcoin-dot-org/developer.bitcoin.org/master/reference/rpc/index.rst'

fetch(rstUrl)
.then(res => res.text())
.then(body => {

    const parsed = parse(body);

    console.log(JSON.stringify(parsed,null,4));
});