provider "google" {
    project = var.project_id
    region  = var.default_region
}


provider "google-beta" {
    project = var.project_id
    region  = var.default_region
}


resource "google_artifact_registry_repository" "nenq_project" {
    provider      = google-beta
    location      = var.default_region
    repository_id = "nenq-project"
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
            name  = "app"
            image = "asia-northeast1-docker.pkg.dev/${var.project_id}/nenq-project/app:latest"
            env {
                name = "PORT"
                value = "8888"
            }
        }

        containers {
            name = "proxy"
            ports {
                container_port = 8080
            }
            image = "asia-northeast1-docker.pkg.dev/${var.project_id}/nenq-project/proxy:latest"
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