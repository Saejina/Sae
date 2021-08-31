port=$(cat .env | grep 'PORT')
port=${port:5}
if [[ -z $port ]]
then
    port=5000
fi

tmp=$(lsof -i:${port})

if [[ $tmp != "" ]]
then
    exit 1
else
    exit 0
fi
