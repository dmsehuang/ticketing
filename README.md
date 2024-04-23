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
   a. You will also need to set the default `region/zone`, for me `us-west1-a`
1. Run `gcloud container clusters get-credentials <cluster_name>`. My cluster URL is: https://console.cloud.google.com/kubernetes/clusters/details/us-west1-a/ticketing-dev/details?hl=en&project=ticketing-416906. We run this command so that we can switch the k8s context, from local docker desktop to a remote k8s engine.
1. Use Google Cloud Build to build the docker image online.
   a. the naming convention for the image is `us.gcr.io/{project_id}/{service_id}`
   a. you specify the project id in the `googleCloudBuild` property.
   a. you can view the build history online
1. Create a `load balancer` since the `ingress` itself only defines the rule. You will need a real load balancer to accept incoming requests.
   a. follow this tutorial: https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke
   a. run this command: `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml`

### Upgrade

When we first created our cluster, it was in `autopilot` mode, which fails our deployments when the number is 10. Now we use the the `standard` mode, and it allows us to configure the number of nodes, the number of CPUs and memory, of course it is more expensive.

The new region is `us-west1-a`, and the name is still `ticketing-dev`, the project is still `ticketing`.

By the way, in the Docker K8S configuration, you can configure the `k8s context`. We can just install `google cloud sdk`, so that it updates google cloud in our local machine and manage the Kubernetes context for us.

## Secret

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<key>
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<key>
```

You can run `kubectl get secrets` to see the lsit of secrets.

## Port forwarding

```
kubectl port-forward nats-depl <port_local>:<port_remote>
```

## Build local image

Instead of deploy images to Google cloud, you can build images locally.

Run the following command for each docker file.
Give the image a tag, like `your_docker_id/image_id`

```
docker build -t dmsehuang/auth .
```

## Frontend

To bypass the https warning, type `thisisunsafe` in chrome.
