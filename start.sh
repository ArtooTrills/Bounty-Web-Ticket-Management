#!/bin/bash

killall node

while true; do
  reset
  npm start

  if (test $? -ne 0); then
    break
  fi
done
