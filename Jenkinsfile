pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo "📥 Clonando el repositorio..."
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    echo "⚙️ Construyendo el proyecto..."
                    bat 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    echo "🧪 Ejecutando pruebas..."
                    bat 'npm run test'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo "🚀 Desplegando aplicación..."
                    bat 'start /B npm start'
                }
            }
        }
    }
    post {
        success {
            echo "✅ Pipeline completado con éxito"
        }
        failure {
            echo "❌ El pipeline ha fallado"
        }
    }
}