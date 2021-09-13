all: install

install:
	@yarn install

start:
	@yarn host

format:
	@printf "\033[0;33mFormatting sae-app server files...\033[0m\n"
	@yarn lint

host:
	@bash scripts/start_server.sh > server.log &
	@printf "\033[0;33mNow hosting server.\033[0m\n"

stop:
	@bash scripts/stop_server.sh

abort:
	@bash scripts/abort_server.sh

clean:
	@find . -name '*\~' -delete
	@find . -name '*.log' -delete
