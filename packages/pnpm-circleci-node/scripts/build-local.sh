set -eo pipefail

# Config
export NODE_VERSION="16.13.1"
export PNPM_VERSION="7.5.1"

export DOCKER_REPO=lsage/pnpm-circleci-node
export IMAGE_NAME=lsage/pnpm-circleci-node:latest

docker build --build-arg NODE_VERSION=$NODE_VERSION --build-arg PNPM_VERSION=$PNPM_VERSION -t $IMAGE_NAME .

sh ./hooks/post_push
