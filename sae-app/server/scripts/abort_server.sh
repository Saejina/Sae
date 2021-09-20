bash scripts/is_server_running.sh

if [[ $? == 1 ]]
then
    printf "\033[0;33mKilling all server processes\033[0m.\n"
    tmp=$(lsof ./ | grep 'node')
    IFS=$'\n'
    for process in ${tmp}
    do
        IFS=$' '
        pid=(${process// / })
        kill -9 ${pid[1]}
    done
else
    exit 0
fi
