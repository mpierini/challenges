var fs = require('fs');

var maskedFields = {member_id: true, person_code: true, first_name: true, last_name: true, date_of_birth: true, gender: true, ssn: true, address_1: true, address_2: true, city: true, state: true, zip: true, primary_first_name: true, primary_last_name: true, prescription_number: true};

var readline = require('readline');

var rl = readline.createInterface({
	input: fs.createReadStream('claims-input.json'),
});

var ws = fs.createWriteStream('masked.json');

var data = '';
rl.on('line', function(line) {
	var needsComma = false;
	if (line.indexOf('[') !== -1 || line.indexOf(']') !== -1) {
		ws.write(line + '\n');
	}
	if (line.indexOf('[') === -1 && line.indexOf(']') === -1) {
		data += line;
	}
	if (line.indexOf('}') !== -1) {
		if (line.indexOf(',') !== -1) {
			data = data.slice(0, data.length-1);
			needsComma = true;
		}
		var d = JSON.parse(data);
		for (key in d) {
			if (maskedFields[key]) {
				d[key] = 'masked';
			}
		}
		ws.write(JSON.stringify(d, null, '\t'));
		if (needsComma) {
			ws.write(',\n');
		}
		data = '';
	}
});

