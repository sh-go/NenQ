provider "google" {
    project = var.project_id
    region  = var.default_region
}


provider "google-beta" {
    project = var.project_id
    region  = var.default_region
}


resource "google_artifact_registry_repository" "nenq_image_repository" {
    provider      = google-beta
    location      = var.default_region
    repository_id = var.repository_id
    description   = "NenQ用"
    format        = "DOCKER"

    cleanup_policy_dry_run = false
    cleanup_policies {
        id     = "keep_minimum-versions"
        action = "KEEP"
        most_recent_versions {
        keep_count = 3
        }
    }
}


resource "google_cloud_run_v2_service" "nenq_project" {
    provider = google-beta
    name     = "nenq-project"
    location = var.default_region
    ingress  = "INGRESS_TRAFFIC_ALL"

    template {
        containers {
            name  = "web-back"
            image = "asia-northeast1-docker.pkg.dev/${var.project_id}/${var.repository_id}/web-back:v1"
            env {
                name = "PORT"
                value = "8000"
            }
            startup_probe {
                failure_threshold     = 1
                initial_delay_seconds = 0
                timeout_seconds       = 240
                period_seconds        = 240
                tcp_socket {
                    port = 8000
                }
            }
        }

        containers {
            name = "nginx"
            image = "asia-northeast1-docker.pkg.dev/${var.project_id}/${var.repository_id}/nginx:v1"
            ports {
                container_port = 8080
            }
            depends_on = [ "web-back" ]
            startup_probe {
                failure_threshold     = 1
                initial_delay_seconds = 0
                timeout_seconds       = 240
                period_seconds        = 240
                tcp_socket {
                    port = 8080
                }
            }
        }

        scaling {
            min_instance_count = 0
            max_instance_count = 1
        }
    }

    traffic {
        type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
        percent = 100
    }
}