variable "app_name" {
  description = "Name for Kubernetes resources"
  type        = string
  default     = "retail-platform-ui"
}

variable "image" {
  description = "Container image to deploy"
  type        = string
  default     = "amandwandwe/retail-platform-ui:latest"
}

variable "namespace" {
  description = "Kubernetes namespace to deploy into"
  type        = string
  default     = "retail-platform"
}

variable "replicas" {
  description = "Number of pod replicas"
  type        = number
  default     = 2
}

variable "app_port" {
  description = "Port the container listens on"
  type        = number
  default     = 80
}
