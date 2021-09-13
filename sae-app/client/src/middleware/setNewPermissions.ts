import axios from 'axios';

export default function setNewPermissions(
    administrator: boolean,
    community: boolean,
    commands: boolean,
    id: string,
    setHelper: Function,
    handleClose?: Function,
): void {
    axios
        .put('http://localhost:5000/perms/edit/' + id, { params: { administrator, community, commands } })
        .then(() => {
            setHelper({ err: false, msg: 'Changements sauvegardés.' });
            handleClose && handleClose();
        })
        .catch((error) => {
            console.log(error);
            setHelper({ err: true, msg: "Une erreur s'est produite" });
        });
}
