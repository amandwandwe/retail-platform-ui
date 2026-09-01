output "namespace" {
  description = "Kubernetes namespace used for the app"
  value       = kubernetes_namespace.app.metadata[0].name
}

output "deployment_name" {
  description = "Name of the Kubernetes deployment"
  value       = kubernetes_deployment.app.metadata[0].name
}

output "service_name" {
  description = "Name of the Kubernetes service"
  value       = kubernetes_service.app.metadata[0].name
}
