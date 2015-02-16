var Schedule = require('./models/schedule');

function getSchedules(res){
	Schedule.find(function(err, schedules) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(schedules); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all schedules
	app.get('/api/schedules', function(req, res) {

		// use mongoose to get all schedules in the database
		getSchedules(res);
	});

	// create schedule and send back all schedules after creation
	app.post('/api/schedules', function(req, res) {

		// create a schedule, information comes from AJAX request from Angular
		Schedule.create({
			date : req.body.date,
			start : req.body.start,
			end : req.body.end,
			activity : req.body.activity
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the schedules after you create another
			getSchedules(res);
		});

	});

	// update a schedule
	app.put('/api/schedules/:schedule_id', function(req, res) {
		Schedule.update({
			_id : req.params.schedule_id,
		}, req.body, function(err, schedule) {
			if (err)
				res.send(err);

			getSchedules(res);
		});
	});

	// delete a schedule
	app.delete('/api/schedules/:schedule_id', function(req, res) {
		Schedule.remove({
			_id : req.params.schedule_id
		}, function(err, schedule) {
			if (err)
				res.send(err);

			getSchedules(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

	// application -------------------------------------------------------------
	app.get('/api/schedule/:schedule_id', function(req, res) {
		console.log(req,'req')
		Schedule.findOne({
			_id : req.params.schedule_id
		}, function(err, schedule) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(schedule); // return all todos in JSON format
		});
	});
};