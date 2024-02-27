pipeline {
    agent any

    environment {
        // Define environment variables
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-pat') // Jenkins credentials ID for Docker Hub
        DOCKER_IMAGE_NAME = 'jahidhsn/node_app' // Docker Hub repository name
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub repository
                git credentialsId: 'GitPAT', url: 'https://github.com/teddy-teem/experiment-server.git'
            }
        }

        stage('Build Image') {
            steps {
                // Build Docker image from Dockerfile in the repository
                script {
                    docker.build(env.DOCKER_IMAGE_NAME)
                }
            }
        }

        // stage('Push Image') {
        //     steps {
        //         // Authenticate with Docker Hub
        //         withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: env.DOCKER_REGISTRY_CREDENTIALS, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD']]) {
        //             // Log in to Docker Hub
        //             script {
        //                 docker.withRegistry('https://index.docker.io/v1/', env.DOCKERHUB_USERNAME, env.DOCKERHUB_PASSWORD) {
        //                     // Push Docker image to Docker Hub
        //                     docker.image(env.DOCKER_IMAGE_NAME).push('latest')
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}
