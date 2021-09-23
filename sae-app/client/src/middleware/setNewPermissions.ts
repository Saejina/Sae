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
        .put(process.env.REACT_APP_API_ADDRESS + '/perms/edit/' + id, {
            params: { administrator, community, commands },
        })
        .then(() => {
            setHelper({ err: false, msg: 'Changements sauvegardés.' });
            handleClose && handleClose();
        })
        .catch((error) => {
            console.log(error);
            setHelper({ err: true, msg: "Une erreur s'est produite" });
        });
}
