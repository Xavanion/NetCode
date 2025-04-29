.PHONY: all frontend backend

all: frontend backend
quick: frontend-quick backend
go: backend
test: frontend jest

frontend:
	cd real-time-app && npm i && npm run build

frontend-quick:
	cd real-time-app && npm run build

backend:
	go run .

jest:
	@echo "Starting Go server..."
	@go run . & GO_PID=$$!; \
	sleep 1; \
	CHILD_PID=$$(pgrep -P $$GO_PID); \
	echo "Go server parent PID: $$GO_PID"; \
	echo "Go server child PID: $$CHILD_PID"; \
	sleep 2; \
	echo "Running Jest tests..."; \
	cd testing && npx jest; \
	EXIT_CODE=$$?; \
	echo "Shutting down Go server..."; \
	if [ -n "$$CHILD_PID" ] && ps -p $$CHILD_PID > /dev/null; then \
		echo "Killing child $$CHILD_PID..."; \
		kill -15 $$CHILD_PID; \
		sleep 1; \
		if ps -p $$CHILD_PID > /dev/null; then \
			echo "Child still alive, forcing kill..."; \
			kill -9 $$CHILD_PID; \
		fi; \
	else \
		echo "Child process $$CHILD_PID already gone."; \
	fi; \
	if ps -p $$GO_PID > /dev/null; then \
		echo "Killing parent $$GO_PID..."; \
		kill -15 $$GO_PID; \
	fi; \
	exit $$EXIT_CODE
