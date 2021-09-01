all: install

install:
	@yarn install

start:
	@yarn start

format:
	@printf "\033[0;33mFormatting sae-app server files...\033[0m\n"
	@yarn lint

host:
	@sh scripts/start_server.sh > server.log &
	@printf "\033[0;33mNow hosting server.\033[0m\n"

stop:
	@sh scripts/stop_server.sh

abort:
	@sh scripts/abort_server.sh

clean:
	@find . -name '*\~' -delete
	@find . -name '*.log' -delete
