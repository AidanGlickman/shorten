docker build -t aidang/shorten-api:latest -t aidang/shorten-api:$GIT_SHA -f ./api/Dockerfile ./api
docker build -t aidang/shorten-main-client:latest -t aidang/shorten-main-client:$GIT_SHA -f ./main-client/Dockerfile ./main-client
docker build -t aidang/shorten-workspace-client:latest -t aidang/shorten-workspace-client:$GIT_SHA -f ./workspace-client/Dockerfile ./workspace-client

docker push aidang/shorten-api:latest
docker push aidang/shorten-main-client:latest
docker push aidang/shorten-workspace-client:latest

docker push aidang/shorten-api:$GIT_SHA
docker push aidang/shorten-main-client:$GIT_SHA
docker push aidang/shorten-workspace-client:$GIT_SHA

kubectl apply -f k8s
kubectl set image deployments/api-deployment api=aidang/shorten-api:$GIT_SHA
kubectl set image deployments/main-client-deployment main-client=aidang/shorten-main-client:$GIT_SHA
kubectl set image deployments/workspace-client-deployment workspace-client=aidang/shorten-workspace-client:$GIT_SHA