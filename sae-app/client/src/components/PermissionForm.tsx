import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FormControlLabel, FormHelperText, Checkbox } from '@material-ui/core';
import isDark from '../middleware/isDark';
import setNewPermissions from '../middleware/setNewPermissions';

export function PermissionForm({ permissions, data, handleClose }: PermissionFormProps): JSX.Element {
    const [administrator, setAdministrator] = useState(permissions.includes('administrator'));
    const [community, setCommunity] = useState(permissions.includes('community'));
    const [commands, setCommands] = useState(permissions.includes('commands'));

    const handleAdministratorChange = (event: any, checked: boolean) => setAdministrator(checked);
    const handleCommunityChange = (event: any, checked: boolean) => setCommunity(checked);
    const handleCommandsChange = (event: any, checked: boolean) => setCommands(checked);
    const [helperText, setHelperText] = useState({ err: false, msg: '' });

    const handlePermissionsChange = () =>
        setNewPermissions(administrator, community, commands, data.platformId, setHelperText, handleClose);

    const fields = [
        { label: 'Administrator', onChange: handleAdministratorChange, value: administrator },
        { label: 'Community', onChange: handleCommunityChange, value: community },
        { label: 'Commands', onChange: handleCommandsChange, value: commands },
    ];
    return (
        <form noValidate autoComplete="off" className="flex flex-col">
            {fields.map((field, index: number) => {
                return (
                    <FormControlLabel
                        key={'user-' + index}
                        control={
                            <Checkbox
                                checked={field.value}
                                name={field.label}
                                className={isDark() ? 'text-primary' : ''}
                                color={isDark() ? 'primary' : 'secondary'}
                                onChange={field.onChange}
                            />
                        }
                        label={field.label}
                    />
                );
            })}
            {helperText.msg && (
                <FormHelperText className={isDark() ? 'text-light' : 'text-dark'}>{helperText.msg}</FormHelperText>
            )}
            <Button variant="success" size="lg" className={'flex-grow w-full mt-4'} onClick={handlePermissionsChange}>
                Valider
            </Button>
        </form>
    );
}

export interface PermissionFormProps {
    permissions: any[];
    data: any;
    handleClose?: Function;
}

export default PermissionForm;
