.PHONY: all frontend backend

all: frontend backend

frontend:
	cd real-time-app && npm i && npm run build

backend:
	go run .

