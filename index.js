
const fs = require('fs')
    , S = require('fluent-json-schema')
    , {default: rstParser} = require('restructured');

const baseUrl = 'https://raw.githubusercontent.com/bitcoin-dot-org/developer.bitcoin.org/master/reference/rpc';
//TODO get tag version

const openapi = {
    "openapi": "3.0.3",
    "info": {
        "title": "Bitcoin RPC API Reference",
        "description": "",
        "version": ""
    },
    "externalDocs": {
        "description": "This site aims to provide the docs you need to understand Bitcoin and start building Bitcoin-based applications.",
        "url": "https://developer.bitcoin.org/reference/rpc/"
    },
    "components": {
        "schemas": {}
    },
    "paths": {}
}

/*const schema = S.object()
.prop('paths', S.array())
console.log(schema.valueOf())*/

fetch(`${baseUrl}/index.rst`)
.then(res => res.text())
.then(body => {

    const parsed = rstParser.parse(body);

    //fs.writeFileSync('dist/index.rst.json', JSON.stringify(parsed,null,4))

    const sections = [];
    parsed.children[1].children.forEach(item => {
        if (item.type === 'section') {
            //console.log(item)
            item.children.forEach(item2 => {
                if (item2.type === 'directive') {
                    item2.children.forEach(item3 => {
                        if (item3.value && !item3.value.includes(':maxdepth:')) {
                            console.log(item3)
                        }
                    })
                }
            })
        }
    })
});

