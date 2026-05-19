pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = "muzzaib"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build --cache-from $DOCKER_HUB_USER/devops-frontend:v1 -t $DOCKER_HUB_USER/devops-frontend:v1 ./frontend'
                sh 'docker build --cache-from $DOCKER_HUB_USER/devops-backend:v1 -t $DOCKER_HUB_USER/devops-backend:v1 ./backend'
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
                sh 'kubectl apply -f kubernetes/deployment.yaml --validate=false || echo "K8s deploy skipped"'
                sh 'kubectl rollout restart deployment/frontend || echo "skipped"'
                sh 'kubectl rollout restart deployment/backend || echo "skipped"'
            }
        }
    }
    post {
        success { echo 'Pipeline SUCCESS!' }
        failure { echo 'Pipeline FAILED!' }
    }
}
