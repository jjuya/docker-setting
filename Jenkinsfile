pipeline {
     agent any

     tools {
        nodejs "nodeJS 20.16.0"
     }

     stages {
        stage("Prepare") {
            steps {
                sh "npm install -g yarn"
            }
        }
        stage("Clean Up Docker") {
            steps {
                sh '''
                    if test "`docker ps -aq --filter name=fe-docker-test`"; then
                    sh "docker stop fe-docker-test"
                    sh "docker rm fe-docker-test"
                    sh "docker rmi docker-test"
                    fi
                '''
            }
        }
        stage("Build Docker Image") {
            steps {
                sh "yarn docker:image"
            }
        }
        stage("Run Docker Container") {
            steps {
                sh "yarn docker:run"
            }
        }
    }
}
