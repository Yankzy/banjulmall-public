SHELL := /bin/zsh
ENV := source .env/bin/activate
PY := $(ENV) && python manage.py
PACKAGE ?= $(shell bash -c 'read -p "Package name: " package; echo $$package')
MSG ?= $(shell bash -c 'read -p "What is the commit message?: " commit message; echo $$commit message')
KEY ?= $(shell bash -c 'read -p "Key value: " key; echo $$key')


help:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

venv:
	python3.10 -m venv .env && $(ENV) && python3.10 -m pip install --upgrade pip && pip install Django


req:
	$(ENV) && pip install -r requirements.txt

proj:
	django-admin startproject config . && $(PY) && python manage.py startapp coaching

run:
	$(PY) runserver 8001 

http:
	ngrok http 8001

dev:
	yarn run dev

build:
	cd frontend && npm run build

mig:
	$(PY) makemigrations

rate:
	$(PY) migrate

super:
	$(PY) createsuperuser

static:
	$(PY) collectstatic

com:
	docker-compose up --build

down:
	docker-compose down

clean:
	git commit -am "clean up" && git push

http:
	ngrok http 3000

npm:
	@clear
	cd frontend && npm install $(PACKAGE)

unpm:
	@clear
	cd frontend && npm uninstall $(PACKAGE)

pip:
	@clear
	$(ENV) && pip install $(PACKAGE)

upip:
	@clear
	$(ENV) && pip uninstall $(PACKAGE)

git :
	git add . && git commit -m '$(MSG)' && git push

up:
	cd infra && pulumi up -y

destroy:
	cd infra && pulumi destroy -y

set:
	cd infra && pulumi config set $(KEY)

secret:
	cd infra && pulumi config set --secret $(KEY)

cel:
	celery -A config worker -l info