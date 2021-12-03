set -eo pipefail

export DOCKER_REPO=lsage/pnpm-circleci-node
export IMAGE_NAME=lsage/pnpm-circleci-node:latest

docker build -t $IMAGE_NAME .

sh ./hooks/post_push
