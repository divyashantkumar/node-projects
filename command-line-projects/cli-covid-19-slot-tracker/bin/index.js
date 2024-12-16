#!/usr/bin/env node


const states = require('../util/states');
const districts = require('../util/district');
const slots = require('../util/slots');


// states.getStates()
// districts.getDistricts(34)

// Since curretly there is no slot and vaccination goin on, we will use 02-05-2022 or dates during which vaccination was going on
const date = new Date('02-05-2022'); // mm-dd-yyyy

slots.getSlots(654, date);