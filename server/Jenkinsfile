pipeline {
    agent any

    tools {
        maven 'maven-3.9.4'
    }

    stages {
        stage('Check tools information') {
            steps {
                echo 'Check tools information'
                sh 'mvn --version'
                sh 'java -version'
            }
        }

        stage('Test') {
            steps {
                echo 'Test'
                sh 'mvn test'
            }
        }

        stage('Build') {
            steps {
                echo 'Build'
                sh 'mvn clean install -DskipTests'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment'
            }
        }

    }
}