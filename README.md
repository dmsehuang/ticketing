# Ticketing

The ticketing service is a platform for listing and buying tickets.
It is a microservice and is built for learning purpose.

## Devlopment

We use `skaffold.yaml` to connect to Google Kubernetes Engine and run our dev environment in GCP.

Here are the steps:

1. In CGP, create a cluster in GCP. By default, we got `3` nodes.
1. In docker desktop, set up a k8s `context` to point to GCP. We need to use [Google Cloud SDK](https://cloud.google.com/sdk/docs) to use the CLI to deal with GCP (just like azure CLI).
   a. You can auth to GCP in the CLI using `gcloud auth login`
   a. You then run `gcloud init`
   a. You will need to set the default `project`, for me `ticketing-dev`
   a. You will also need to set the default `region`, for me `us-west1`
1. Run `gcloud container clusters get-credentials <cluster_name>`
1. Use Google Cloud Build to build the docker image online.
   a. the naming convention for the image is `us.gcr.io/{project_id}/{service_id}`
   a. you specify the project id in the `googleCloudBuild` property.
   a. you can view the build history online
1. Create a `load balancer` since the `ingress` itself only defines the rule. You will need a real load balancer to accept incoming requests.
