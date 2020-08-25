#!/bin/bash

VERSION="$(head -1 ./Dockerfile | cut -d ':' -f2)"
MAJOR="$(echo $VERSION | cut -d '.' -f1)"
MINOR="$MAJOR.$(echo $VERSION | cut -d '.' -f2)"

docker tag $IMAGE_NAME $DOCKER_REPO:$MAJOR
docker tag $IMAGE_NAME $DOCKER_REPO:$MINOR
docker tag $IMAGE_NAME $DOCKER_REPO:$VERSION

docker push $DOCKER_REPO
