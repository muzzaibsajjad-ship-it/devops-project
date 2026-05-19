pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = "muzzaib"
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'cd frontend && npm install'
                sh 'cd backend && npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'cd frontend && npm test'
                sh 'cd backend && npm test'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_HUB_USER/devops-frontend:v1 ./frontend'
                sh 'docker build -t $DOCKER_HUB_USER/devops-backend:v1 ./backend'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                sh 'docker push $DOCKER_HUB_USER/devops-frontend:v1'
                sh 'docker push $DOCKER_HUB_USER/devops-backend:v1'
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f kubernetes/deployment.yaml --validate=false'
                sh 'kubectl rollout restart deployment/frontend'
                sh 'kubectl rollout restart deployment/backend'
            }
        }
    }
    post {
        success { echo 'Pipeline SUCCESS!' }
        failure { echo 'Pipeline FAILED!' }
    }
}
