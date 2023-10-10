
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

/*fetch(`${baseUrl}/index.rst`)
.then(res => res.text())
.then(body => {
    fs.writeFileSync('dist/index.rst.json', JSON.stringify(parsed,null,4))
});*/

const baseDir = './developer.bitcoin.org/reference/rpc';

const body = fs.readFileSync(`${baseDir}/index.rst`,'utf8')

const parsed = rstParser.parse(body);


const sections = [];
parsed.children[1].children.forEach(item => {
    if (item.type === 'section') {
        //console.log(item)
        item.children.forEach(item2 => {
            if (item2.type === 'directive') {
                item2.children.forEach( async item3 => {
                    if (item3.value && !item3.value.includes(':maxdepth:')) {

                        let method = item3.value;
                        let title = '';
                        let description = '';

                        if (!method) return;

                        //console.log(method);

                        const filename = `${baseDir}/${method}.rst`;

                        fs.readFile(filename, 'utf8', (err, data) => {
                          if (!err && data) {
                            const rst = rstParser.parse(data);
                            const def = rst.children[1];

                            //if (method!=='validateaddress') return;

                            //console.log(filename, JSON.stringify(def,null,4));

                            def.children.forEach(item4 => {
                                if (item4.type === 'title') {
                                    title = item4.children[0].value;
                                    console.log(title)
                                }
                                if (item4.type === 'paragraph') {
                                    description = item4.children[0].value;
                                    //console.log(description)
                                }
                                let json = ''
                                if (item4.type === 'section') {
                                    item4.children.forEach(item5 => {

                                        if(item5.type === 'literal_block') {

                                            description = item4.children[1].children.forEach(line => {
                                                //console.log(line.value)
                                                json += line.value+'\n';
                                            });
                                            console.log(json)
                                        }
                                    })

                                }
                            })
                          }
                          else {
                            console.log('file not found', filename)
                          }
                        })
                    }
                })
            }
        })
    }
})


