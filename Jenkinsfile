pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'Docker'
        DOCKERHUB_USERNAME = 'faizzpersonal'
        BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/lms-backend:latest"
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/library-frontend:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/faizzpersonal/LibraryManagementSystem.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('LMS') {
                    sh './mvnw clean package -DskipTests'
                    sh "docker build -t ${BACKEND_IMAGE} ."
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('library-frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh "docker build -t ${FRONTEND_IMAGE} ."
                }
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${BACKEND_IMAGE}"
                    sh "docker push ${FRONTEND_IMAGE}"
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
