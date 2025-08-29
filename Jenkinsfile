pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/faizzpersonal/LibraryManagementSystem.git'
            }
        }
        stage('Build Backend') {
            steps {
                dir('LMS') {
                    sh 'chmod +x ./mvnw'
                    sh './mvnw clean package -DskipTests'
                    sh 'docker build -t faizzpersonal/lms-backend:latest .'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('library-frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'docker build -t faizzpersonal/library-frontend:latest .'
                }
            }
        }
        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login --username $DOCKER_USER --password-stdin'
                    sh 'docker push faizzpersonal/lms-backend:latest'
                    sh 'docker push faizzpersonal/library-frontend:latest'
                    sh 'docker logout'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kube', variable: 'KUBECONFIG')]) {
                    dir('k8s') {
                        sh 'kubectl apply -f .'
                    }
                }
            }
        }
    }
}
