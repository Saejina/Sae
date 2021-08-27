port=$(cat .env | grep 'PORT')
port=${port:5}

if [[ -z $port ]]
then
    port=5000
fi

sh scripts/is_server_running.sh

if [[ $? == 1 ]]
then
    printf "\033[0;33mKilling process listening on port $port\033[0m.\n"
    printf "\033[0;35mIt wont start again until you edit one of its source files or run the make host command.\033[0m\n"
    tmp=$(lsof -i:$port | grep 'node')
    pid=(${tmp// / })
    kill -9 ${pid[1]}
else
    exit 0
fi