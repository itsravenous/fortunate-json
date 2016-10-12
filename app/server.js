'use strict';
const fortune = require('fortune');
const htmlApiSerializer = require('fortune/lib/net/http_html_serializer');
const jsonSerializer = require('./lib/http_json_serializer');
const express = require('express');
const cors = require('cors');
const store = require('./lib/store');
const NotFoundError = require('./errors/not_found');

// Setup server
const server = express();
server.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
server.use((req, res, next) => {
  console.log(new Date(), req.method, req.path);
  next();
});

// Add generic fortune routes
server.use(fortune.net.http(store, {
	serializers: [
		[ htmlApiSerializer ],
		[ fortune.serializers.formData ],
		[ fortune.serializers.formUrlEncoded ],
		[ jsonSerializer ]
	]
}));

server.use((req, res, next) => {
  next(new NotFoundError());
});

if (server.get('env') === 'development') {
  // Development error handler - show full stacktrace
  server.use((err, req, res, next) => {
    // Log it
    console.error(err.stack);
    // Send it
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err.stack
    });
  });
} else {
  // Production error handler - no stacktraces leaked to user
  server.use((err, req, res, next) => {
    // Log it
    console.error(err.stack);
    // Set code
    const code = err.status || 500;
    res.status(code);
    // 500 is default code for errors, so assume message is sensitive
    const message = code === 500 ? 'Internal server error' : err.message;
    // Send it
    res.json({ message });
  });
}

// Start server
store.connect().then(() => server.listen(1337));
