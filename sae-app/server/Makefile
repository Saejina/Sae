all: install

install:
	@yarn install

start:	host

format:
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
