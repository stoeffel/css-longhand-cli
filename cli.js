#!/usr/bin/env node

var meow = require("meow");
var logSymbols = require('log-symbols');
var fs = require("fs");
var cssLonghand = require("css-longhand");

var cli = meow({
    help: [
        "Usage",
        "  css-longhand <path/to/css> [path/to/out] --silent"
    ]
});

function onError(err) {
	if (!cli.flags.silent) {
		process.stdout.write([logSymbols.error, 'Error converting file'].join(' '));
		process.stdout.write(err);
	}
	process.exit(1);
}

fs.readFile(cli.input[0], "utf-8", function(err, data) {
	if (err) {
		onError(err);
	} else {
		if (cli.input[1]) {
			fs.writeFile(cli.input[1], cssLonghand(data), function(err) {
				if (err) {
					onError(err);
				} else {
					if (!cli.flags.silent)
						process.stdout.write([logSymbols.success, 'Created', cli.input[1]].join(' '));
				}
			});
		} else process.stdout.write(cssLonghand(data));
	}
});
