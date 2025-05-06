# SeqIntegrated Logging for iTwin.js Starter Kit

This project provides integrated logging for the iTwin.js Starter Kit using Seq, a structured log server.

## Features

- **Structured Logging**: Capture detailed, structured logs for better insights.
- **Seq Integration**: Seamlessly integrate with Seq for advanced log management and visualization.
- **Configurable**: Easily configure logging settings to suit your needs.

## Installation

Download and install the [Seq](https://datalust.co/download).

## Install Dependencies

   ```sh
   npm install
   ```

## Build and Start Project

   ```sh  
   npm build
   npm start
   ```


## Configuration

In this sample SeqLogger can be configured with the following options in .env:

- `SEQ_URL`: The URL of the Seq server - http://127.0.0.1:5341/
- `SEQ_API_KEY`: The API key for authenticating with the Seq server.
- `LOG_LEVEL`: The minimum log level to capture (e.g., `info`, `debug`, `error`).

