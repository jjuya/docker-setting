# docker-setting

# Set up

## Git

### 1. git plugin 설치

> Dashboard → Jenkins 관리 → Plugins
>
- Available plugins : Jenkins에 설치해 사용할 수 있는 plugin 목록
- Installed plugins : 설치된 plugin 목록

### 2. Git Credential 세팅

> Dashboard → Jenkins 관리 → Credentials
>
- [Git credential 부분](https://velog.io/@jmyoon8/123123)  참고
- Git private key 발급
- Global credentials 에 등록( 등록 방법은 검색하면 블로그에 방법 잘 나옴)

## Jenkins Item

> Dashboard → 새로운 Item
>
- Pipeline project 생성
- Pipeline : Pipeline script from SCM
- SCM : Git → repo 정보 + credential 세팅
- Script Path : Jenkinsfile

## Jenkinsfile

```bash
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
                    docker stop [container_name]
                    docker rm [container_name]
                    docker rmi [image_name]
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
```