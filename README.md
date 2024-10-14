## Installation

### Install with DockerHub
1.  type this command for backend service
 ```sh
 docker run -p 8080:8080 razizs/simple-form-backend-service:v1
 ```

 2. type this command for frontend service
 ```sh
 docker run -p 3000:3000 razizs/simple-form-frontend-service:v1
 ```

 ### Manual installation
1. Clone the repo
   ```sh
    git clone https://github.com/razidev/Mekar-Service.git
   ```
2. Open both folder frontend and backend services
3. then type this command to run:
   ```sh
    docker-compose up
   ```