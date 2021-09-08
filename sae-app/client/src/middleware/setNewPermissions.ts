import axios from 'axios';

export default function setNewPermissions(
    administrator: boolean,
    community: boolean,
    commands: boolean,
    id: string,
    setHelper: Function
): void {
    axios
        .get('http://localhost:5000/perms/edit/' + id, {params: {administrator, community, commands}})
        .then(() => {
            setHelper({err: false, msg: 'Changements sauvegardés.'})
        })
        .catch((error) => {
            console.log(error);
            setHelper({err: true, msg: "Une erreur s'est produite"})
        })
    console.log(administrator, community, commands, id);
}
