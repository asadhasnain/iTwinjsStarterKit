# SeqLogger

SeqLogger is a logging utility for explaining how to use th SEQ Structured Logging Server. It provides a simple and efficient way to log messages and events to Seq for real time search and analysis of your application log.

## Features

- Easy integration with iTwin.js applications
- Structured logging with support for various log levels
- Configurable logging settings
- Supports logging to Seq server

## Installation

Download and install the [Seq](https://datalust.co/download).

To install SeqLogger, use the following command:

```sh
npm install
```

## Configuration

In this sample SeqLogger can be configured with the following options in .env:

- `SEQ_URL`: The URL of the Seq server - http://127.0.0.1:5341/
- `SEQ_API_KEY`: The API key for authenticating with the Seq server.
- `LOG_LEVEL`: The minimum log level to capture (e.g., `info`, `debug`, `error`).

## Log Levels

SeqLogger supports the following log levels:

- `trace`
- `debug`
- `info`
- `warn`
- `error`
- `fatal`
