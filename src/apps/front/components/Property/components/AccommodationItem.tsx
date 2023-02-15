import { SvgIconComponent } from '@mui/icons-material';
import { Box, SvgIcon, Typography, Grid, Radio } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { Accommodation, KeysOfAccomodationOptions, KeysOfBeds } from '../../../../../packages/types/properties.types';
import KingBedIcon from '@mui/icons-material/KingBed';
import BedIcon from '@mui/icons-material/Bed';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import ChairIcon from '@mui/icons-material/Chair';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalBarIcon from '@mui/icons-material/LocalBar';

class Bed {
    static readonly largeDoubleBed = new Bed('Grand lit double', KingBedIcon);
    static readonly doubleBed = new Bed('Lit double', BedIcon);
    static readonly simpleBed = new Bed('Lit simple', SingleBedIcon);
    static readonly sofaBed = new Bed('Canapé lit', ChairIcon);
    private constructor(public readonly text: string, public readonly icon: SvgIconComponent) {}
}

class Option {
    static readonly airConditionned = new Option('Air conditionné', AcUnitIcon);
    static readonly minibar = new Option('Mini-bar', LocalBarIcon);
    private constructor(public readonly text: string, public readonly icon: SvgIconComponent) {}
}

interface AccommodationItemProps {
    accommodation: Accommodation;
    index: number;
    selectedAccommodation: number;
    handleChangeSelectedAccommodation: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AccommodationItem({
    accommodation,
    index,
    selectedAccommodation,
    handleChangeSelectedAccommodation,
}: AccommodationItemProps) {
    const keysOfBeds = Object.keys(accommodation.beds) as KeysOfBeds[];
    const keysOfOptions = Object.keys(accommodation.options) as KeysOfAccomodationOptions[];

    return (
        <Box>
            <Typography
                variant='h5'
                component='h3'
            >
                {accommodation.name}
            </Typography>
            <Grid
                container
                columnSpacing={3}
            >
                <Grid
                    item
                    xs={4}
                    sx={{ mt: 1, display: 'flex', gap: 2 }}
                >
                    {Object.values(accommodation.beds).map(
                        (value, i) =>
                            value > 0 && (
                                <BedItem
                                    key={`${keysOfBeds[i]}-item`}
                                    bed={Bed[keysOfBeds[i]]}
                                    numb={value}
                                />
                            )
                    )}
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{ mt: 1, display: 'flex', gap: 2 }}
                >
                    {Object.values(accommodation.options).map(
                        (option, i) =>
                            option && (
                                <OptionItem
                                    key={keysOfOptions[i]}
                                    option={Option[keysOfOptions[i]]}
                                />
                            )
                    )}
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{ mt: 1, display: 'flex', gap: 2 }}
                >
                    <Box
                        sx={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
                    >
                        <Typography>{accommodation.price}€ / nuit</Typography>
                        <Radio
                            checked={selectedAccommodation === index}
                            onChange={handleChangeSelectedAccommodation}
                            value={index}
                            name={`accommodation-${index + 1}-radio-button`}
                            inputProps={{ 'aria-label': accommodation.name }}
                            color='primary'
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

interface BedItemProps {
    bed: Bed;
    numb: number;
}

function BedItem({ bed, numb }: BedItemProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
            }}
        >
            <SvgIcon
                component={bed.icon}
                inheritViewBox
                color='secondary'
            />
            <Typography sx={{ ml: 1 }}>{bed.text}</Typography>
            <Typography sx={{ ml: 1 }}>{numb}</Typography>
        </Box>
    );
}

interface OptionItemProps {
    option: Option;
}

function OptionItem({ option }: OptionItemProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
            }}
        >
            <SvgIcon
                component={option.icon}
                inheritViewBox
                color='secondary'
            />
            <Typography sx={{ ml: 1 }}>{option.text}</Typography>
        </Box>
    );
}
