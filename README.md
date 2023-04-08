# Sheet2App - CSE 416 Project

Team Penguins

## Getting Started

### Prerequisites

#### Linux

Install Docker and Compose Plugin

* [Manually](https://docs.docker.com/compose/install/linux/#install-using-the-repository)
* [One Click](https://www.docker.com/products/docker-desktop)

#### Windows

Install WSL2, Docker Desktop, and VSCode Extensions

1. [WSL2](https://code.visualstudio.com/docs/remote/wsl-tutorial#_install-visual-studio-code)
2. [Docker Desktop](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers)

#### Both

1. Rename your `server/s2a_api/migrations` folder to something else.
2. Set the OAuth Client ID environment variable in `client/Dockerfile`
3. Set the OAuth Client ID and Secret environment variables in `server/Dockerfile`

### Start

Run `docker compose up` to start the app. Add:

* `-d` to start in detached mode,
* `--build` to rebuild the images.

Please wait a moment for the following to become available:

* The client at <http://localhost:3000>,
* The server's admin panel at <http://localhost:8000/admin>,
  * The default username is `admin` with password `password`
* The server's health checks at <http://localhost:8000/ht>.

### Test

#### Frontend

[![frontend](https://github.com/alexanderleong1/Sheet2App/actions/workflows/frontend.yml/badge.svg)](https://github.com/alexanderleong1/Sheet2App/actions/workflows/frontend.yml)

Run `docker exec -it node npm test` to run the frontend's tests in interactive mode.

Alternatively, run `docker exec node npm test -- --watchAll=false`.

#### Backend

[![backend](https://github.com/alexanderleong1/Sheet2App/actions/workflows/backend.yml/badge.svg)](https://github.com/alexanderleong1/Sheet2App/actions/workflows/backend.yml)

Run `docker exec django pytest` to run the backend's tests. Add:

* `-n logical` to run tests in parallel,
* `-v` for verbose output.

##### Monitor Cache

If you started in detached mode, run `docker exec redis redis-cli monitor` to monitor the Redis cache.

##### Flush Cache

Run `docker exec redis redis-cli flushall` to flush the Redis cache.

> WARNING | This will delete all data in the cache. Do not run in production.

### Stop

If you started in detached mode, run `docker compose down` to stop the app. Add:

* `-v` to remove its volumes,
* `--rmi all` to remove its images,
* `-t 0` to stop immediately.
