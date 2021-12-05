#!/bin/bash

# You need to change this if you changed the one at src/config/index.ts
SERVICE_NAME=app

docker events --filter 'event=create'  --filter 'event=start' --filter 'type=container' --format '{{.Actor.Attributes.name}} {{.Status}}' | while read event_info

do
	event_infos=($event_info)
	container_name=${event_infos[0]}
	event=${event_infos[1]}

	echo "$container_name: status = ${event}"

	if [[ $container_name = "base-project-serverless-localstack_localstack" ]] && [[ $event == "start" ]]; then
		echo "Sleeping"
		sleep 15 # let localstack some time to start
		echo "Creating Secrets"
		aws --endpoint-url=http://localstack:4566 ssm put-parameter --name "$SERVICE_NAME-region-dev" --type String --value "us-east-1" --overwrite
		aws --endpoint-url=http://localstack:4566 ssm put-parameter --name "$SERVICE_NAME-accessKey-dev" --type String --value "fake-access-key" --overwrite
		aws --endpoint-url=http://localstack:4566 ssm put-parameter --name "$SERVICE_NAME-secretKey-dev" --type String --value "fake-secret-key" --overwrite
	fi
done
