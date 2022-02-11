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
        timestamps()
        ansiColor('xterm')
    }


    stages {
        stage('Checkout') {
            steps {
                prepareRepo()
            }
        }

        stage ('Intall') {
            steps {
                sh 'npm install'
            }
        }

        stage ('Build') {
            steps {
                sh 'npm run build'
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
        }

        failure {
            echo "Job has failed during ${env.FAILURE_STAGE}!"
            notifySlack(env.BUILD_VERSION, 'FAILURE', env.JOB_URL)
        }
    }
}
