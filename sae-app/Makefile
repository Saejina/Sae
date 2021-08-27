all: install


install-server:
	@make -C server install

install-client:
	@make -C client install

install: install-server install-client


start-server:
	@make -C server start

start-client:
	@make -C client start

start: start-server start-client


format-server:
	@make -C server format

format-client:
	@make -C client format

format: format-server format-client


stop-server:
	@make -C server stop

host-server:
	@make -C server host

.PHONY: install-server \
	install-client \
	install \
	start-server \
	start-client \
	start \
	format-server \
	format-client \
	format \
	stop-server \
	host-server
