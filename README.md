<div align="center">

<img src="https://github.com/techmmunity/eslint-config/raw/master/resources/logo.gif" width="300" height="300">

# Techmmunity - Base Project Serverless LocalStack

<a href="https://github.com/techmmunity/eslint-config">
	<img src="https://img.shields.io/badge/style%20guide-Techmmunity-01d2ce?style=for-the-badge" alt="Style Guide: Techmmunity">
</a>
<a href="https://www.codefactor.io/repository/github/techmmunit/base-project-serverless-localstack">
	<img src="https://www.codefactor.io/repository/github/techmmunit/base-project-serverless-localstack/badge?style=for-the-badge" alt="CodeFactor">
</a>
<a href="https://coveralls.io/github/techmmunit/base-project-serverless-localstack?branch=master">
	<img src="https://img.shields.io/coveralls/github/techmmunit/base-project-serverless-localstack/master?style=for-the-badge" alt="Coveralls">
</a>
<a href="https://github.com/techmmunit/base-project-serverless-localstack/actions/workflows/coverage.yml">
	<img src="https://img.shields.io/github/workflow/status/techmmunit/base-project-serverless-localstack/Collect%20Coverage?label=tests&logo=github&style=for-the-badge" alt="Tests">
</a>

<br>
<br>

</div>

## Features

- LocalStack for local tests
  - LocalStack Dashboard working
- LambdaLayers, to decrease the packages size
- Cognito integration
- DynamoDB integration

# Clean all cache

```sh
sudo rm -rf .serverless/ tmp/ layers/
docker system prune
docker volume prune
```

## TODO

- [ ] Test Cognito Integration
