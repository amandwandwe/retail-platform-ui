resource "kubernetes_service" "app" {
  metadata {
    name      = "${var.app_name}-svc"
    namespace = kubernetes_namespace.app.metadata[0].name
    labels = {
      app = var.app_name
    }
  }

  spec {
    selector = {
      app = var.app_name
    }

    port {
      port        = 80
      target_port = var.app_port
      protocol    = "TCP"
    }

    type = "ClusterIP"
  }
}
