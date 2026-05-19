pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/muzzaibsajjad-ship-it/devops-project.git'
            }
        }
        stage('Test Backend') {
            steps {
                sh 'cd backend && npm install && npm test'
            }
        }
        stage('Test Frontend') {
            steps {
                sh 'cd frontend && npm install && npm test'
            }
        }
        stage('Security Scan') {
            steps {
                sh 'trivy fs . --exit-code 0 --severity HIGH,CRITICAL'
            }
        }
        stage('Build Images') {
            steps {
                sh 'docker build -t muzzaib/devops-frontend:v1 ./frontend'
                sh 'docker build -t muzzaib/devops-backend:v1 ./backend'
            }
        }
        stage('Push Images') {
            steps {
                sh 'docker push muzzaib/devops-frontend:v1'
                sh 'docker push muzzaib/devops-backend:v1'
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f kubernetes/deployment.yaml'
                sh 'kubectl rollout status deployment/frontend'
                sh 'kubectl rollout status deployment/backend'
            }
        }
    }
    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed!'
        }
    }
}
