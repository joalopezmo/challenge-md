# ChallengeMd By Jorge Alejandro Lopez Montoya

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨


## Project structure
The project is structured as a monorepo, with the following structure:

![image](https://github.com/joalopezmo/challenge-md/assets/91128812/3246d327-954f-4134-a275-6439ef69ef1c)

The main idea of this repo is to make a crud application created in angular 17, using the microfronts architecture by federated modules, using Nx as monorepo. Although the repository has 3 projects, challenge-md, host and table; this example is only structured in the host and table applications, and the challenge-md application is only as an example that in a monorepo can subsist alternate applications that are not related, without affecting project developments.

The project is an application of microfrontend architecture, so it is composed by different applications that are independent and can be deployed independently. The applications are:

host: is the main application of the project, a recipe application that allows to manage the remotes microfront of the project. It will contains the main menu, a login screen, and the router outlet. It has been develop with standalone components, and will implement funtional guards, interceptors and services.
table: is a microfrontend application that allows to interact with the back API. It has one standalone component, table, that allows to show the information of the API.

The project also contains the following libraries:

ui: contains the shared ui modules importated from angular material. The library is imported by the different applications of the project and is transversal to the project. It shows the potencial of the monorepo architecture by allowing to share code between the different applications without the need of creating a npm package or a git submodule.

## Running the project
To run the project, you need to run the following commands:

npm install <br>
nx serve host (in a terminal) to run the host application, the main application of the project. Be sure to install nx globally (npm install -g nx) to run the command.
npm run serve is a custom command that runs the table application. It is a custom command that runs the following commands:
    "build": "nx run host:build:production",
    "test": "nx test host",
    "serve": "nx serve host --devRemotes=table"

## Running unit tests
Run nx test host to execute the unit tests via Jest. or nx test host --coverage to get the coverage of the unit testing. The unit testing was only applied to the host application, as it is the main application of the project.

![image](https://github.com/joalopezmo/challenge-md/assets/91128812/d900d474-91bc-475d-bbda-b0fe58d379d0)

## Running e2e test
There is e2e test added to each project with relation, they are using playwright and it is still to be developed. 

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Builder

Just run `nx build host` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## CI/CD

### docker
Added Dockerfile to each microfrontend(host and remotes)
Added nginx.conf file to each microfrontend
![image](https://github.com/joalopezmo/challenge-md/assets/91128812/42420a83-19ed-464c-a1ef-a73f1425c97e)

### github actions
A ci file was created to make the description of each one of the steps, where it is checked by means of a pipeline with two tasks, the main and the deploy task; the installation of dependencies, the build and finally it is deployed by means of the use of the own secrets of the repo to the following bucket s3 (with an example name). 
http://elasticbeanstalk-eu-central-1-651475835863.s3-website.eu-central-1.amazonaws.com/

![image](https://github.com/joalopezmo/challenge-md/assets/91128812/14d44c78-7b89-4fa5-9e67-68c5a9d5d7fa)

![image](https://github.com/joalopezmo/challenge-md/assets/91128812/ec3d5a05-81d0-4dbb-8491-9fb18514551b)



Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Project Graph
Run `nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

