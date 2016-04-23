#!/bin/bash

# Check that essential env vars are set
[ -z "$MONGODB_URI" ] && echo "Error: MONGODB_URI not set!" && exit 1;

docker kill api 2>/dev/null || true
docker rm -f api 2>/dev/null || true
docker run \
  --detach \
  --restart=on-failure:5 \
  --publish 3000:3000 \
  --name api \
  --env MONGODB_URI=$MONGODB_URI \
  quay.io/seenproject/api
