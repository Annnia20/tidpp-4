pipeline {
    agent any
    
    environment
    {
        ON_SUCCESS_SEND_EMAIL=true
        ON_FAILURE_SEND_EMAIL=true
    }
    
    parameters
    { 
        booleanParam(name:'CLEAN_WORKSPACE',
        defaultValue:true,
        description:'Trebuie de sters mapa pentru buld-ul curent?'
        )
        booleanParam(name:'TESTING_FRONTEND',
        defaultValue:false,
        description:'Trebuie de testat frontend-ul?'
        )
    }
    
    tools {

        nodejs "NodeJS"


    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the application'
                // Get some code from a GitHub repository
                git 'https://github.com/Annnia20/tidpp-3.git'
                sh 'npm install'
                sh 'npm install mocha'

            }
        }
        stage('Test backend')
        {
            steps{
                echo 'Testarea backend'
                sh 'chmod 777 ./node_modules/.bin/mocha'
                sh 'npm test'
            }  
           // post {
                // If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.
              // success {
                   // junit 'output/coverage/junit/junit.xml'
              // }
          //  }
        }
        stage('Test front end')
        {
            
            when
            {
                expression
                {
                    params.TESTING_FRONTEND==true
                }
            }
            steps{
                echo 'Testing front...'
                echo "Testarea frontend ${params.TESTING_FRONTEND}"
            }    
        }
      stage("Continuous Delivery") {
            steps {
                echo "Push all to DockerHub"
                bat 'docker push ecaterinaciobanu49/lab4tidpp'
            }
        }
        
        stage("Continuous Deployment") {
            steps {
                echo "Docker Build & docker-compose"
                bat 'docker build . -t ecaterinaciobanu49/lab4tidpp && docker-compose up'
            }
        } 
    }
    post
    {
        always 
        {
            script
            {
                if(params.CLEAN_WORKSPACE==true)
                {
                    echo 'Stergerea mapei create'
                    cleanWs()
                }
                
            }
        }
        success
        {

            script
            {
                if(env.ON_SUCCESS_SEND_EMAIL)
                {
                    echo "Send email success job name: ${JOB_NAME}, build number: ${BUILD_NUMBER}, build url: ${BUILD_URL} "
                    emailext ( body: "Success! job name: ${JOB_NAME}, build number: ${BUILD_NUMBER}, build url: ${BUILD_URL}", subject: 'Build', to: 'ecaterinaciobanu49@gmail.com')
                    echo 'Email sent'
                }
            }
        }
        failure
        {

            script
            {
                if(env.ON_FAILURE_SEND_EMAIL)
                {
                    echo "Send email fail job name: ${JOB_NAME}, build number: ${BUILD_NUMBER}, build url: ${BUILD_URL} "
                    emailext ( body: "Fail! job name: ${JOB_NAME}, build number: ${BUILD_NUMBER}, build url: ${BUILD_URL}", subject: 'Build', to: 'ecaterinaciobanu49@gmail.com')
                    echo 'Email sent'
                }
            }
        }
    }
}
