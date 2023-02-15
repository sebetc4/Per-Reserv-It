import React, { ChangeEvent, useEffect, useState } from 'react';

import { Box, Rating, Typography, Grid, Divider, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { FacilityItem, Carousel, AccommodationItem } from './components';
import { KeysOfFacilities } from '../../../../packages/types/properties.types';
import { setAlert } from '../../../../store';

interface IProperty {}

export default function Property({}: IProperty) {
    // Hooks
    const dispatch = useAppDispatch();

    // Store
    const { error, data: property } = useAppSelector((state) => state.property);

    useEffect(() => {
        error &&
            dispatch(setAlert({
                type: 'error',
                message: "Erreur lors de la récupération de l'hébergement. Merci d'essayer ultérieurement.",
            }));
    }, [dispatch, error]);

    // State
    const [selectedAccommodation, setSelectedAccommodation] = useState<number>(0);

    const handleChangeSelectedAccommodation = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedAccommodation(+e.target.value);
    };

    const keysOfFacilities = property ? Object.keys(property.facilities) : null;

    return property ? (
        <Box>
            <Grid
                container
                spacing={2}
            >
                {/* Informations */}
                <Grid
                    item
                    xs={4}
                >
                    <Typography
                        component='h1'
                        variant='h2'
                        sx={{
                            mt: 2,
                            mb: 2,
                        }}
                    >
                        {property.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ mt: 1 }}>
                            {`${property.location.address}, ${property.location.city}, ${property.location.postcode}`}
                        </Typography>
                        <Box sx={{ display: 'flex', mt: 1, mb: 1 }}>
                            <Rating
                                name={`rating-${property.name}`}
                                value={property.rating}
                                readOnly
                                precision={0.5}
                                emptyIcon={
                                    <StarIcon
                                        style={{ opacity: 0.55 }}
                                        fontSize='inherit'
                                    />
                                }
                            />
                            <Typography
                                sx={{
                                    ml: 1,
                                }}
                            >
                                ({property.numbOfReview} avis)
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ mt: 1, mb: 1 }}>
                        <Typography
                            component='h2'
                            sx={{
                                px: 2,
                                py: 2,
                            }}
                        >
                            Description
                        </Typography>
                    </Divider>
                    <Typography>{property.description}</Typography>
                    <Divider sx={{ mt: 1, mb: 1 }}>
                        <Typography
                            component='h2'
                            sx={{
                                pl: 2,
                                pr: 2,
                            }}
                        >
                            Points forts
                        </Typography>
                    </Divider>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        {Object.values(property.facilities).map(
                            (facility, i) =>
                                facility && (
                                    <FacilityItem
                                        key={`${keysOfFacilities![i]}-item`}
                                        type={keysOfFacilities![i] as KeysOfFacilities}
                                    />
                                )
                        )}
                    </Box>
                </Grid>

                {/* Carousel */}
                <Grid
                    item
                    xs={8}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Carousel
                        name={property.name}
                        images={property.images}
                    />
                </Grid>
            </Grid>

            {/* Accomodations */}
            <Box sx={{ mt: 8 }}>
                <Divider sx={{ mt: 1, mb: 1 }}>
                    <Typography
                        component='h2'
                        sx={{
                            pl: 2,
                            pr: 2,
                        }}
                    >
                        Types d'hébergement
                    </Typography>
                </Divider>
                {property.accommodations.map((accommodation, i) => (
                    <Box key={accommodation.name}>
                        <AccommodationItem
                            accommodation={accommodation}
                            index={i}
                            selectedAccommodation={selectedAccommodation}
                            handleChangeSelectedAccommodation={handleChangeSelectedAccommodation}
                        />
                        {i + 1 < property.accommodations.length && <Divider sx={{ mt: 2, mb: 2 }} />}
                    </Box>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant='outlined'
                        sx={{
                            mt: 6,
                        }}
                    >
                        Réserver
                    </Button>
                </Box>
            </Box>
        </Box>
    ) : (
        <>Loading</>
    );
}
