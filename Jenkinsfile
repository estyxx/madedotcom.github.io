
pipeline {
    agent {
        label 'aws-ecr'
    }

    options {
        ansiColor('xterm')ƒ
    }

    stages {
        stage('Checkout') {
            steps {
                prepareRepo()
            }
        }

        stage ('Build') {
            steps {
                sh 'yarn build'
            }
        }

        stage ('Deploy') {
            steps {
                sh 'make deploy'
            }
        }
    }

    post {
        always {
            echo 'Cleanup...'
            sh 'docker-compose -f docker-compose.yml logs'
            sh "make clean BUILD_VERSION=${env.BUILD_VERSION}"
        }

        failure {
            echo "Job has failed during ${env.FAILURE_STAGE}!"
            notifySlack(env.BUILD_VERSION, 'FAILURE', env.JOB_URL)
        }
    }
}
