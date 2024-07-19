### DEVSECOPS environment



############################################################

JENKINSFILE config

pipeline {
agent any
tools{
maven '3.5.0'
}
stages{
stage('Build Maven'){
steps{
checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Anar1982/devops-automation/']])
sh 'mvn clean install'
}
}

```
    stage('SNYK-SAST-SCAN') {
      steps {
         //snykSecurity severity: 'high', snykInstallation: 'Synk', snykTokenId: 'snyk'
         //snykSecurity failOnError: false, severity: 'high', snykInstallation: 'Synk', snykTokenId: 'snyk'
         snykSecurity failOnIssues: false, snykInstallation: 'Synk', snykTokenId: 'snyk'
  }
  }

    stage('Build docker image'){
        steps{
            script{
                sh 'docker build -t anar02/devops-integration . '
            }
        }
    }

     stage('Push image to Hub'){
        steps{
            script{
                withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerpwd')]) {
                sh 'docker login -u anar02 -p ${dockerpwd}'

```

}

sh 'docker tag anar02/devops-integration anar02/devops-sast-integration1:latest'
sh 'docker push anar02/devops-sast-integration1:latest'

```
}

```

}

}

stage('Deploy to k8s'){
steps{
script{
kubernetesDeploy (configs: 'deploymentservice.yaml',kubeconfigId: 'newkub')

}

}

}

```
    stage('Running DAST Burp Scanner') {
        steps {
           sh """ curl -vgw "\\n"  -X POST '<http://192.168.17.144:8080/api/N938jN8eS6OubnDiJtUXHGx2YpvkoJkD/v0.1/scan>' -d '{"scan_configurations":[{"name":"fast","type":"NamedConfiguration"}],"urls":["<http://192.168.17.139:31803/"]}'">""
        }
    }

```

}

}
