#!groovy
import hudson.AbortException

def prepareRepo() {
    deleteDir()

    checkout scm

    initEnvironment()
}

def initEnvironment() {
    env.BRANCH_NAME = sh(script: "make -s get-branch BRANCH_NAME=${env.BRANCH_NAME}", returnStdout: true).toLowerCase().trim()
    env.BUILD_VERSION = sh(script: "make -s get-version BRANCH_NAME=${env.BRANCH_NAME}", returnStdout: true).toLowerCase().trim().replace('\n', '')
    env.DESCRIPTION = sh(script: "make -s get-desc BRANCH_NAME=${env.BRANCH_NAME}", returnStdout: true)

    currentBuild.displayName = env.BUILD_VERSION
    currentBuild.description = env.DESCRIPTION
}


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
