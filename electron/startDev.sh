#!/bin/bash

NODE_ENV=development ../node_modules/.bin/concurrently \
    "cd ../frontend && WEBPACK_TARGET=electron npm start" \
    "electron ."
