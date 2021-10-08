format: format-server format-client

format-client:
	@make -C client format

format-server:
	@make -C server format

host: host-server	host-client

host-server:
	@make -C server host

host-client:
	@make -C client host

install: install-server install-client

install-client:
	@make -C client install

install-server:
	@make -C server install

start: host-server start-client

start-client:
	@make -C client start

start-server:
	@make -C server start

stop-server:
	@make -C server stop

host-server:
	@make -C server host

.DEFAULT_GOAL:	install

.PHONY: format 			\
		format-client 	\
		format-server 	\
		install 		\
		install-client 	\
		install-server 	\
		start 			\
		start-client 	\
		start-server 	\
		stop-server 	\
		host-server
