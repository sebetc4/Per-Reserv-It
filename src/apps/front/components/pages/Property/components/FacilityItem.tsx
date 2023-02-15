import { Box, SvgIcon, Typography } from '@mui/material';
import React from 'react';
import { KeysOfFacilities } from '../../../../../../packages/types/properties.types';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { SvgIconComponent } from '@mui/icons-material';
import WifiIcon from '@mui/icons-material/Wifi';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PetsIcon from '@mui/icons-material/Pets';
import CleaningServicesSharpIcon from '@mui/icons-material/CleaningServicesSharp';

interface IFacilitieItemsProps {
    type: KeysOfFacilities;
}

class Facility {
    static readonly carPark = new Facility('Parking', LocalParkingIcon);
    static readonly internet = new Facility('Wifi', WifiIcon);
    static readonly breakfast = new Facility('Petit déjeuné', FreeBreakfastIcon);
    static readonly petsAllowed = new Facility('Annimaux de compagnie', PetsIcon);
    static readonly roomCleaning = new Facility('Service de nettoyage', CleaningServicesSharpIcon);
    private constructor(public readonly text: string, public readonly icon: SvgIconComponent) {}
}

export default function FacilityItem({ type }: IFacilitieItemsProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
            }}
        >
            <SvgIcon
                component={Facility[type].icon}
                inheritViewBox
                color='secondary'
            />
            <Typography sx={{ ml: 1 }}>{Facility[type].text}</Typography>
        </Box>
    );
}
