#!/bin/bash

set -e

echo docker 编译 ...
docker build --rm -f "docker_prisma/Dockerfile" -t nestjs-api-dev:1.0.0 "."